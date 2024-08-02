"use client";
import React, { useEffect, useState } from "react";
import styles from "./Step3.module.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Step3 = ({ onPrev, onSubmit, phone, email }) => {
  const [formData, setFormData] = useState({
    adhaarFront: null,
    adhaarBack: null,
    panFront: null,
    userPhoto: null,
    userId: "",
    Signature: null,
    phone: phone || "",
    email: email || ""
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
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("adhaarFront", formData.adhaarFront);
    formDataToSend.append("adhaarBack", formData.adhaarBack);
    formDataToSend.append("userId", formData.userId);
    formDataToSend.append("panFront", formData.panFront);
    formDataToSend.append("userPhoto", formData.userPhoto);
    formDataToSend.append("Signature", formData.Signature);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("email", formData.email);

    try {
      const response = await axios.post(
        "http://localhost:8000/step3Details",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      if (response.status === 200) {
        onSubmit(formData);
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
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Step 3: Upload Documents</h2>
        {errorMessage && <div className={styles.alert}>{errorMessage}</div>}
        <div className={styles.formGroup}>
          <label htmlFor="adhaarFront" className={styles.label}>
            Aadhaar Card Front Side
          </label>
          <input
            type="file"
            className={styles.input}
            id="adhaarFront"
            name="adhaarFront"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="adhaarBack" className={styles.label}>
            Aadhaar Card Back Side
          </label>
          <input
            type="file"
            className={styles.input}
            id="adhaarBack"
            name="adhaarBack"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="panFront" className={styles.label}>
            PAN Card Front Side
          </label>
          <input
            type="file"
            className={styles.input}
            id="panFront"
            name="panFront"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className={styles.formGroup}>
          <label htmlFor="panBack" className={styles.label}>
            PAN Card Back Side
          </label>
          <input
            type="file"
            className={styles.input}
            id="panBack"
            name="panBack"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div> */}
        <div className={styles.formGroup}>
          <label htmlFor="userPhoto" className={styles.label}>
            User Photo
          </label>
          <input
            type="file"
            className={styles.input}
            id="userPhoto"
            name="userPhoto"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="Signature" className={styles.label}>
            Candidate Signature
          </label>
          <input
            type="file"
            className={styles.input}
            id="Signature"
            name="Signature"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={onPrev}
          >
            Previous
          </button>
          <button type="submit" className={styles.btnPrimary}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step3;
