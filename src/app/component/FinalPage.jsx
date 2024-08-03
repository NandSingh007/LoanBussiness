"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaEquals,
  FaNotEqual
} from "react-icons/fa";
import jsPDF from "jspdf";
import Image from "next/image";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import styled from "styled-components";
import imgScanner from "../Image/scaner.png";
import Spinner from "./Spinner";
import SpinnerSec from "./SpinnerSec";

const Container = styled.div`
  background-color: #dfdfdfcf;
  font-family: "Roboto", sans-serif;
  padding: 0px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Distribute space between items */
  text-align: right;
  color: white;
  font-weight: 500;
  font-size: 1rem;
  background-color: ${(props) => (props.active ? "#4CAF50" : "gray")};
  padding: 10px 20px;
`;

const LoanAmount = styled.span`
  background-color: ${(props) => (props.active ? "#bdb6b8" : "#ff5722")};
  border-radius: 10px;
  padding: 4px 10px;
  font-size: 0.7rem;
  margin: 0 10px;
  color: black;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  border: ${(props) => (props.active ? "none" : "2px solid #000")};
  background: ${(props) => (props.active ? "transparent" : "#fff")};
  box-shadow: ${(props) =>
    props.active ? "none" : "0px 4px 6px rgba(0, 0, 0, 0.1)"};
`;
const Separator = styled.span`
  display: inline-block;
  margin: 0 5px;
  font-size: 1.5rem;

  color: ${(props) => (props.active ? "#fff" : "#fff")};
`;
const ApplicationForm = styled.div`
  max-width: 900px;
  margin: auto;
  background-color: white;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.7rem;
  font-weight: 700;
  color: orange;
`;

const CompanyDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const DetailSection = styled.div`
  flex: 1;
  text-align: center;
  font-size: 0.8rem;
  padding: 1px;
`;

const InfoSection = styled.div`
  margin-bottom: 15px;
`;

const InfoTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1px;
`;

const InfoText = styled.p`
  font-size: 0.9rem;
  color: #333;
`;

const TableSection = styled.div`
  margin-top: 0px;
`;

const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
`;

const NoteSection = styled.div`
  margin-top: 15px;
`;

const Note = styled.p`
  font-size: 0.9rem;
  color: #333;
`;

const NoteHighlight = styled.span`
  font-weight: bold;
`;

const SignatureSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Signature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
`;

const SignatureText = styled.p`
  margin-top: 5px;
`;

const ContactInfo = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #333;
`;

const DownloadButton = styled.button`
  margin-top: 20px;
  font-size: 1rem;
  color: white;
  background: ${(props) => (props.active ? "orange" : "#888")};
  padding: 10px 20px;
  border-radius: 6px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  cursor: ${(props) => (props.active ? "pointer" : "not-allowed")};
  border: none;
`;

const InstructionText = styled.p`
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  color: orange;
  padding: 15px 20px;
  line-height: 1.5;
`;

const ScannerDetails = styled.span`
  display: block;
  font-size: 1rem;
  font-weight: normal;
  color: #555555;
  margin-top: 10px;
  font-family: "Arial", sans-serif;
  text-align: center;
`;

const ScannerImageContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const ScannerImage = styled.div`
  width: 205px;
  height: 205px;
  background-color: HighlightText;
  border: 1px solid black;
`;

const TransactionText = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #333;
`;

const FinalPage = () => {
  const contentRef = useRef();
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [securityData, setSecurityData] = useState("");
  const [paymentQRCharges1, setPaymentQRCharges1] = useState("");
  const [logo, setLogo] = useState("");
  const [paymentQRCharges2, setPaymentQRCharges2] = useState("");
  const [signature, setSignature] = useState("");
  const [personalDetails, setPersonalDetails] = useState({
    step4Details: {},
    joDocuments: {},
    stepFormData: {},
    jobDetail: {},
    loanTypeData: ""
  });

  const [statusOne, setStatusOne] = useState(0);
  const [statusTwo, setStatusTwo] = useState(0);
  const [loading, setLoading] = useState(true);
  // Fetch and set statuses

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("newtoken");
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.userId;
          const response = await axios.get(
            `https://admin.quicklone.com/Statusendpoint/${userId}`
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

  // Redirect if either status is false
  useEffect(() => {
    if (!loading && statusOne !== null && statusTwo !== null) {
      // Ensure both statuses are loaded and valid
      if (statusOne === false || statusTwo === false) {
        window.location.href = "/"; // Redirect to the root route if any status is 0
      }
    }
  }, [loading, statusOne, statusTwo]);
  // Fetch personal details
  useEffect(() => {
    const fetchPersonalDetails = async () => {
      const token = Cookies.get("newtoken");
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        const response = await axios.get(
          `https://admin.quicklone.com/personalDetailsOfUser/${userId}`
        );
        setPersonalDetails(response.data);
      } catch (err) {
        console.error("Error fetching personal details:", err);
      }
    };
    fetchPersonalDetails();
  }, []);

  // Fetch company profile
  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const response = await axios.get(
          "https://admin.quicklone.com/fetchCompanyProfile"
        );
        setCompanyProfile(response.data.data);
      } catch (err) {
        console.error("Error fetching company profile:", err);
      }
    };

    fetchCompanyProfile();
  }, []);

  // Fetch security data
  useEffect(() => {
    const fetchDataofSecurity = async () => {
      const token = Cookies.get("newtoken");
      let userId;

      if (token) {
        const decoded = jwtDecode(token);
        userId = decoded.userId;
      }

      if (userId) {
        try {
          const response = await axios.get(
            `https://admin.quicklone.com/getSecurityFeeDataWithStatusOneFront/${userId}`
          );
          setSecurityData(response.data);
        } catch (error) {
          console.error("Error fetching security data:", error);
        }
      } else {
        console.error("User ID is not defined.");
      }
    };
    fetchDataofSecurity();
  }, []);

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const response = await axios.get(
          "https://admin.quicklone.com/CompanyProfileScn"
        );

        setPaymentQRCharges1(response.data[0].paymentQRCharges1); // Assuming only one company profile is returned
        setPaymentQRCharges2(response.data[0].paymentQRCharges2); // Assuming only one company profile is returned
        setSignature(response.data[0].Signature);
        setLogo(response.data[0].logo);
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

  const handleDownload = async () => {
    const element = contentRef.current;
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      logging: true
    });
    const imgData = canvas.toDataURL("image/png");

    const inputWidth = canvas.width;
    const inputHeight = canvas.height;
    const orientation = inputWidth > inputHeight ? "landscape" : "portrait";

    const pdf = new jsPDF({
      orientation: orientation,
      unit: "px",
      format: [inputWidth, inputHeight]
    });

    pdf.addImage(imgData, "PNG", 0, 0, inputWidth, inputHeight);
    pdf.save("download.pdf");
  };

  const imageUrl = companyProfile?.paymentQR
    ? `/${companyProfile.paymentQR.replace(/\\/g, "/")}`
    : imgScanner;
  const { step4Details, loanTypeData } = personalDetails;
  const amount = step4Details.amount || 0;
  const years = step4Details.years || 0;
  const interest = loanTypeData.interest || 0;

  const calculateEMI = (principal, annualInterestRate, months) => {
    if (principal <= 0 || annualInterestRate <= 0 || months <= 0) return 0;

    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const emi =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, months)) /
      (Math.pow(1 + monthlyInterestRate, months) - 1);
    return emi.toFixed(2); // Round to 2 decimal places
  };
  const months = years * 12; // Convert years to months
  const emi = calculateEMI(amount, interest, months);
  const isActive = securityData.Status === 1;
  const income = parseFloat(personalDetails?.jobDetail?.income) || 0;
  const charges1 = parseFloat(companyProfile?.charges1) || 0;
  const charges2 = parseFloat(companyProfile?.charges2) || 0;
  const totalAmount = income + charges1 + charges2;

  const signatureBase64 = personalDetails?.joDocuments?.Signature || "";
  // Prefix the base64 string with the data type
  const signatureSrc = `data:image/jpeg;base64,${signatureBase64}`;

  if (loading) {
    return (
      <>
        <SpinnerSec />
      </>
    ); // Show loading indicator while fetching
  }

  return (
    <Container>
      <Header active={securityData?.Status}>
        {securityData && securityData.Status === 1 ? (
          <>
            <FaCheckCircle
              color="green"
              size={24}
              style={{ marginRight: "8px" }}
            />
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>Active</span>
            <LoanAmount active={securityData.Status}>
              {income} + {charges1} + {charges2}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  marginLeft: "8px"
                }}
              >
                <FaEquals size={18} style={{ marginRight: "4px" }} />
                {totalAmount}
              </span>
            </LoanAmount>
          </>
        ) : (
          <>
            <FaTimesCircle
              color="red"
              size={24}
              style={{ marginRight: "8px" }}
            />
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              Inactive
            </span>
            <LoanAmount active={securityData.Status}>
              {income} + {charges1} + {charges2}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  marginLeft: "8px"
                }}
              >
                <FaNotEqual size={18} style={{ marginRight: "4px" }} />
                {totalAmount}
              </span>
            </LoanAmount>
          </>
        )}
      </Header>

      <div className="container">
        <ApplicationForm>
          <div ref={contentRef} className="form-content">
            <FormHeader>Application Form</FormHeader>
            <CompanyDetails>
              <DetailSection
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "red",
                  border: "1px solid white",
                  backgroundColor: "aliceblue"
                }}
              >
                QuickLoan
              </DetailSection>
              <DetailSection
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid white",
                  backgroundColor: "aliceblue"
                  // height: "60px" // Adjust height as needed
                }}
              >
                <Image
                  src={bufferToBase64(logo)}
                  alt="img"
                  width={50}
                  height={20}
                />
              </DetailSection>
            </CompanyDetails>
            <div className="center-div-info">
              <DetailSection>
                <InfoSection>
                  <InfoTitle>UserName</InfoTitle>
                  <InfoText>{personalDetails.stepFormData.name}</InfoText>
                </InfoSection>
                <InfoSection>
                  <InfoTitle>Loan amount</InfoTitle>
                  <InfoText>{personalDetails.step4Details.amount}</InfoText>
                </InfoSection>
                <InfoSection>
                  <InfoTitle>Address</InfoTitle>
                  <InfoText>{personalDetails.stepFormData.address}</InfoText>
                </InfoSection>
              </DetailSection>
              <DetailSection>
                <InfoSection>
                  <InfoTitle>Work</InfoTitle>
                  <InfoText>{personalDetails.jobDetail.jobType}</InfoText>
                </InfoSection>
                <InfoSection>
                  <InfoTitle>Income</InfoTitle>
                  <InfoText>{personalDetails.jobDetail.income}</InfoText>
                </InfoSection>
                <InfoSection>
                  <InfoTitle>Loan Type</InfoTitle>
                  <InfoText>{personalDetails.step4Details.loanType}</InfoText>
                </InfoSection>
              </DetailSection>
              <DetailSection>
                <InfoSection>
                  <InfoTitle>Duration</InfoTitle>
                  <InfoText>{personalDetails.step4Details.years}</InfoText>
                </InfoSection>
                <InfoSection>
                  <InfoTitle>Interest</InfoTitle>
                  <InfoText>{personalDetails.loanTypeData.interest} %</InfoText>
                </InfoSection>
                <InfoSection>
                  <InfoTitle>Monthly Emi</InfoTitle>
                  <InfoText>{emi}</InfoText>
                </InfoSection>
              </DetailSection>
            </div>
            <TableSection>
              <InfoTable>
                <thead>
                  <tr>
                    <th className="table-header">Sr.</th>
                    <th className="table-header">Job</th>
                    <th className="table-header">Income</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>{personalDetails.jobDetail.jobType}</td>
                    <td>{personalDetails.jobDetail.income}</td>
                  </tr>
                </tbody>
                <thead>
                  <tr>
                    <th className="table-header">Sr.</th>
                    <th className="table-header">Loan Type</th>
                    <th className="table-header">Intrest</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>{personalDetails.loanTypeData.loanType}</td>
                    <td>{personalDetails.loanTypeData.interest}</td>
                  </tr>
                </tbody>

                <thead>
                  <tr>
                    <th className="table-header">Sr.</th>
                    <th className="table-header">Amount</th>
                    <th className="table-header">EMI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <InfoText>{amount}</InfoText>
                    </td>
                    <td>
                      <InfoText>{emi}</InfoText>
                    </td>
                  </tr>
                </tbody>
              </InfoTable>
            </TableSection>
            <NoteSection>
              <Note>
                <NoteHighlight>Note:</NoteHighlight> Our mission is to provide
                accessible and affordable loan solutions to individuals and
                businesses, empowering them to achieve their dreams and
                aspirations.
              </Note>
              <div class="note-container">
                <p style={{ fontSize: "0.8rem" }}>
                  {" "}
                  <span class="note-highlight" style={{ fontSize: "1rem" }}>
                    Integrity:
                  </span>{" "}
                  We uphold the highest standards of integrity in all our
                  actions.
                </p>
                <p style={{ fontSize: "0.8rem" }}>
                  {" "}
                  <span class="note-highlight" style={{ fontSize: "1rem" }}>
                    Customer Focus:
                  </span>{" "}
                  Our customers are at the heart of everything we do.
                </p>
                <p style={{ fontSize: "0.8rem" }}>
                  <span class="note-highlight" style={{ fontSize: "1rem" }}>
                    Excellence:
                  </span>{" "}
                  We strive for excellence in all aspects of our business.
                </p>
              </div>
            </NoteSection>
            <SignatureSection>
              <Signature>
                {signatureSrc ? (
                  <Image src={signatureSrc} alt="img" width={50} height={20} />
                ) : (
                  <p>No Signature Available</p>
                )}
                <SignatureText>Applicant Signature</SignatureText>
              </Signature>
              <Signature>
                <Image
                  src={bufferToBase64(signature)}
                  alt="img"
                  width={50}
                  height={20}
                />

                <SignatureText>Company Signature</SignatureText>
              </Signature>
            </SignatureSection>

            <ContactInfo>
              Contact No: {personalDetails.joDocuments.phone}
            </ContactInfo>
          </div>
          <DownloadButton
            active={isButtonActive}
            onClick={handleDownload}
            disabled={!isButtonActive}
          >
            Download PDF
          </DownloadButton>
          <InstructionText>
            To transfer the loan amount, scan this QR code on the Razorpay App
            and enter the UTR Number below:
          </InstructionText>
          <ScannerImageContainer>
            <ScannerImage>
              <Suspense fallback={<div>Loading image...</div>}>
                <Image
                  src={bufferToBase64(paymentQRCharges2)}
                  width={200}
                  height={200}
                  alt="Scanner"
                />
              </Suspense>
            </ScannerImage>
          </ScannerImageContainer>

          <TransactionText>
            We will verify the transfer and process the loan within 30 minutes
            after receiving the payment.
          </TransactionText>
        </ApplicationForm>
      </div>
    </Container>
  );
};

export default FinalPage;
