"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "./Step2.css"; // Make sure to create this CSS file

const Step2 = ({ onNext, onPrev, phone, email }) => {
  const [formData, setFormData] = useState({
    income: "",
    jobType: "",
    userId: "",
    incomeProof: null,
    phone: phone || "", // Pre-fill phone
    email: email || "" // Pre-fill email
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = Cookies.get("newtoken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setFormData((prevForm) => ({
          ...prevForm,
          userId: decoded.userId
        }));
        console.log("Decoded userId:", decoded.userId); // Log decoded userId
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.userId, "formData.userId");
    const formDataToSend = new FormData();
    formDataToSend.append("userId", formData.userId);
    formDataToSend.append("income", formData.income);
    formDataToSend.append("jobType", formData.jobType);
    if (formData.incomeProof) {
      formDataToSend.append("incomeProof", formData.incomeProof);
    }
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("email", formData.email);

    console.log("Form Data being sent:", formDataToSend); // Log form data

    try {
      const response = await axios.post(
        "http://admin.http://quicklone.com/step2Details",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      if (response.status === 200) {
        onNext({ ...formData, ...response.data }); // Pass formData and response data to the next step
      } else {
        setErrorMessage("Failed to submit data. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        "An error occurred while submitting data. Please try again."
      );
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h2 className="form-heading">Step 2: Income and Job Details</h2>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group mb-3">
              <label htmlFor="income" className="form-label">
                Income
              </label>
              <input
                type="text"
                className="form-control"
                id="income"
                name="income"
                value={formData.income}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="jobType" className="form-label">
                Job Type
              </label>
              <select
                className="form-control"
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
              >
                <option value="">Select Job Type</option>
                <option value="Government">Government</option>
                <option value="Private">Private</option>
                <option value="Personal Business">Personal Business</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="incomeProof" className="form-label">
                Income Proof
              </label>
              <input
                type="file"
                className="form-control"
                id="incomeProof"
                name="incomeProof"
                onChange={handleChange}
              />
            </div>
            <div className="button-group">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onPrev}
              >
                Previous
              </button>
              <button type="submit" className="btn btn-primary">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step2;
