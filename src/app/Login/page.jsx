"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import SpinnerSec from "../component/SpinnerSec";

const Login = () => {
  const [data, setData] = useState({ number: "", otp: "" });
  const [error, setError] = useState(null);
  const [isNumberValid, setIsNumberValid] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = Cookies.get("token") || Cookies.get("newtoken");
      if (token) {
        try {
          jwtDecode(token);
          router.push("/"); // Redirect to home page if authenticated
        } catch (error) {
          // If token is invalid, remove it and show login page
          Cookies.remove("token");
          Cookies.remove("newtoken");
          setLoading(false);
        }
      } else {
        setLoading(false); // No token, show login page
      }
    };
    checkAuthentication();
  }, [router]);

  const SendOtp = async (updatedData) => {
    try {
      const response = await axios.post(`https://admin.quicklone.com/sendotp`, {
        userphone: updatedData.number,
        userotp: updatedData.otp
      });
      if (response.data) {
        console.log("Data Sent Successfully", response.data);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setData({ ...data, number: newValue });
    setIsNumberValid(newValue.length === 10);
    setError(null);
  };

  const handleOtpChange = (e) => {
    const newValue = e.target.value;
    setData({ ...data, otp: newValue });
    setIsOtpValid(newValue.length === 4);
    setError(null);
  };

  const otpHandle = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const handleSubmit = async () => {
    if (!isNumberValid) {
      setError("Phone number must be exactly 10 digits long");
      return;
    }
    try {
      const otp = otpHandle();
      const updatedData = { ...data, otp };
      console.log(updatedData, "updatedData");
      const response = await fetch("https://admin.quicklone.com/loginNumber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      Cookies.set("token", responseData.token, { expires: 30 });
      console.log(updatedData, "updatedData");
      SendOtp(updatedData);
    } catch (error) {
      setError(error.message);
      console.error("There was an error!", error);
    }
  };

  const handleSubmitOtp = async () => {
    if (!isOtpValid) {
      setError("OTP must be exactly 4 digits long");
      return;
    }
    try {
      const token = Cookies.get("token");
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      const updatedData = { ...data, id: userId, number: data.number };

      const response = await fetch("https://admin.quicklone.com/update-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        setData({ number: "", otp: "" });
        throw new Error("Please fill in the correct OTP");
      }

      const responseData = await response.json();
      Cookies.set("newtoken", responseData.token, { expires: 30 });
      Cookies.remove("token");
      window.location.reload(); // Reload the current page
      setData({ number: "", otp: "" });
    } catch (error) {
      setError(error.message);
      console.error("There was an error!", error);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <SpinnerSec />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0"
      }}
    >
      <div
        style={{
          width: "350px",
          border: "1px solid rgba(4,8,7,0.8)",
          overflow: "hidden",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
        }}
      >
        <h3
          style={{
            fontSize: "27px",
            fontWeight: "700",
            color: "blue",
            textAlign: "center"
          }}
        >
          Login
        </h3>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="number"
            placeholder="Enter Your Number"
            value={data.number}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />
          <input
            type="button"
            value="Submit"
            onClick={handleSubmit}
            disabled={!isNumberValid}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: isNumberValid ? "blue" : "grey",
              color: "white",
              fontSize: "18px",
              cursor: isNumberValid ? "pointer" : "not-allowed",
              border: "none"
            }}
          />
        </div>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <div>
          <input
            type="number"
            placeholder="Enter Your OTP"
            value={data.otp}
            onChange={handleOtpChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />
          <input
            type="button"
            value="Submit OTP"
            onClick={handleSubmitOtp}
            disabled={!isOtpValid}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: isOtpValid ? "blue" : "grey",
              color: "white",
              fontSize: "18px",
              cursor: isOtpValid ? "pointer" : "not-allowed",
              border: "none"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
