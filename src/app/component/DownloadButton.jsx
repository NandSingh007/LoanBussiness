"use client";
import Image from "next/image";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
import "./download.css";
import SpinnerSec from "./SpinnerSec";

const scanner2 = lazy(() => import("../Image/scaner.png"));

const DownloadButton = () => {
  const [transactionNumber, setTransactionNumber] = useState("");
  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState();
  const [paymentQRCharges1, setPaymentQRCharges1] = useState("");
  const [paymentQRCharges2, setPaymentQRCharges2] = useState("");
  const [securityData, setSecurityData] = useState("");
  const [statusOne, setStatusOne] = useState(0);
  const [statusTwo, setStatusTwo] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("newtoken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setFormData((prevForm) => ({
          ...prevForm,
          userId: decoded.userId
        }));
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("newtoken");
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.userId;
          const response = await axios.get(
            `http://localhost:8000/Statusendpoint/${userId}`
          );

          setStatusOne(response.data.statusOne);
          setStatusTwo(response.data.statusTwo);
        } else {
          console.error("Token not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && statusTwo === false) {
      window.location.href = "/"; // Redirect to the root route
    }
  }, [loading, statusTwo]);

  useEffect(() => {
    const fetchSecurityData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/fetchCompanyProfile"
        );
        setSecurityData(response.data);
      } catch (error) {
        console.error("Error fetching personal details:", error);
      }
    };
    fetchSecurityData();
  }, []);

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/CompanyProfileScn"
        );

        console.log(
          response.data[0].paymentQRCharges2,
          "response.data[0].paymentQRCharges1"
        );
        setPaymentQRCharges1(response.data[0].paymentQRCharges1); // Assuming only one company profile is returned
        setPaymentQRCharges2(response.data[0].paymentQRCharges2); // Assuming only one company profile is returned
      } catch (error) {
        console.error("Error fetching company profile:", error);
      }
    };
    fetchCompanyProfile();
  }, []);

  const bufferToBase64 = (buffer) => {
    // Check if the buffer is a string and decode it accordingly
    return `data:image/png;base64,${buffer}`;
  };
  if (loading) {
    return (
      <div>
        <SpinnerSec />
      </div>
    );
  }

  return (
    <>
      <div className="header">
        <h1 className="title">Welcome to Our Payment Portal</h1>
        <p className="subtitle">
          Please follow the steps to complete your processing fee payment
        </p>
      </div>
      <p className="scanner">Processing Fees</p>
      <div className="image-container">
        <Suspense fallback={<div>Loading image...</div>}>
          <Image
            src={bufferToBase64(paymentQRCharges1)}
            width={280}
            height={280}
            alt="Scanner"
          />
        </Suspense>
      </div>

      <style jsx>{`
        .header {
          text-align: center;
          margin: 20px 0;
        }

        .title {
          font-size: 2em;
          font-weight: bold;
          color: #333;
        }

        .subtitle {
          font-size: 1.2em;
          color: #666;
        }

        .scanner {
          text-align: center;
          font-size: 1.5em;
          font-weight: bold;
          margin-top: 20px;
        }

        .image-container {
          display: flex;
          justify-content: center;
          margin: 20px 0;
        }

        .form-container {
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          margin: 0 auto;
        }

        .transaction-number-sec {
          text-align: center;
          font-size: 1.2em;
          margin-bottom: 20px;
          color: #555;
        }

        .form-control {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 10px;
          width: 100%;
          font-size: 16px;
          margin-bottom: 10px;
          box-sizing: border-box;
        }

        .btn {
          background-color: #007bff;
          padding: 10px;
          border-radius: 5px;
          color: white;
          border: none;
          width: 100%;
          font-size: 16px;
          cursor: pointer;
        }

        .btn:hover {
          background-color: #0056b3;
        }

        @media (max-width: 600px) {
          .form-control {
            padding: 8px;
            font-size: 14px;
          }

          .btn {
            padding: 8px;
            font-size: 14px;
          }

          .scanner {
            font-size: 1.2em;
          }

          .transaction-number-sec {
            font-size: 1em;
          }
        }
      `}</style>
    </>
  );
};

export default DownloadButton;
