// "use client";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
// import React, { useState, useEffect } from "react";

// const Step4 = ({ onPrev, onSubmit, phone, email }) => {
//   const [formData, setFormData] = useState({
//     loanType: "",
//     amount: "",
//     years: "",
//     userId: "",
//     phone: phone || "",
//     email: email || ""
//   });
//   const [loanTypes, setLoanTypes] = useState([]);

//   useEffect(() => {
//     const fetchLoanTypes = async () => {
//       try {
//         const response = await axios.get("https://admin.quicklone.com/GetLoanTypes");
//         console.log(response.data, "response.dataresponse.data");
//         setLoanTypes(response.data);
//       } catch (error) {
//         console.error("Error fetching loan types:", error);
//       }
//     };

//     fetchLoanTypes();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   useEffect(() => {
//     const token = Cookies.get("newtoken");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setFormData((prevForm) => ({
//           ...prevForm,
//           userId: decoded.userId
//         }));
//       } catch (error) {
//         console.error("Failed to decode token", error);
//       }
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://admin.quicklone.com/stepfourdetails",
//         formData
//       );
//       console.log("Form submitted successfully:", response.data);
//       onSubmit(formData);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Step 4: Loan Information</h2>

//       <div className="form-group mb-3">
//         <label htmlFor="loanType">Type of Loan</label>
//         <select
//           className="form-control"
//           id="loanType"
//           name="loanType"
//           value={formData.loanType}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Loan Type</option>
//           {loanTypes.map((type) => (
//             <option key={type._id} value={type.loanType}>
//               {type.loanType}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="form-group mb-3">
//         <label htmlFor="amount">Loan Amount</label>
//         <input
//           type="number"
//           className="form-control"
//           id="amount"
//           name="amount"
//           value={formData.amount}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div className="form-group mb-3">
//         <label htmlFor="years">Number of Years</label>
//         <input
//           type="number"
//           className="form-control"
//           id="years"
//           name="years"
//           value={formData.years}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div className="form-group mb-3">
//         <label htmlFor="phone">Phone</label>
//         <input
//           type="text"
//           className="form-control"
//           id="phone"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div className="form-group mb-3">
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           className="form-control"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <button type="button" className="btn btn-secondary" onClick={onPrev}>
//         Previous
//       </button>
//       <button type="submit" className="btn btn-primary">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default Step4;

"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import styles from "./Step4.module.css"; // Import CSS Module

const Step4 = ({ onPrev, onSubmit, phone, email }) => {
  const [formData, setFormData] = useState({
    loanType: "",
    amount: "",
    years: "",
    Status: 1,
    userId: "",
    phone: phone || "",
    email: email || ""
  });
  const [loanTypes, setLoanTypes] = useState([]);

  useEffect(() => {
    const fetchLoanTypes = async () => {
      try {
        const response = await axios.get(
          "https://admin.quicklone.com/GetLoanTypes"
        );
        setLoanTypes(response.data);
      } catch (error) {
        console.error("Error fetching loan types:", error);
      }
    };

    fetchLoanTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://admin.quicklone.com/stepfourdetails",
        formData
      );
      console.log("Form submitted successfully:", response.data);
      onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Step 4: Loan Information</h2>

        <div className={styles.formGroup}>
          <label htmlFor="loanType" className={styles.label}>
            Type of Loan
          </label>
          <select
            className={styles.input}
            id="loanType"
            name="loanType"
            value={formData.loanType}
            onChange={handleChange}
            required
          >
            <option value="">Select Loan Type</option>
            {loanTypes.map((type) => (
              <option key={type._id} value={type.loanType}>
                {type.loanType}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="amount" className={styles.label}>
            Loan Amount
          </label>
          <input
            type="number"
            className={styles.input}
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="years" className={styles.label}>
            Number of Years
          </label>
          <input
            type="number"
            className={styles.input}
            id="years"
            name="years"
            value={formData.years}
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

export default Step4;
