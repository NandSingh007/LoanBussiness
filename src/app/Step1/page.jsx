"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "./Step1.css"; // Make sure to create this CSS file

const Step1 = ({ onNext }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pinCode: "",
    fatherName: "",
    userId: ""
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
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the formData to the backend API
      const response = await axios.post(
        "http://localhost:8000/step1Details",
        formData
      );

      if (response.status === 200) {
        // Call onNext with formData to move to the next step
        onNext(formData);
      } else {
        // Handle other status codes appropriately
        setErrorMessage(
          response.data.message || "Failed to submit data. Please try again."
        );
      }
    } catch (error) {
      // Handle errors from the backend or network issues
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(
          "An error occurred while submitting data. Please try again."
        );
      }
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h2 className="form-heading">Step 1: User Details</h2>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="\d{10}"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="pinCode" className="form-label">
                Address Pin Code
              </label>
              <input
                type="text"
                className="form-control"
                id="pinCode"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="fatherName" className="form-label">
                Father Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fatherName"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-submit">
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step1;
