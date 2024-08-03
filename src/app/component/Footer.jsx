"use client";
import React from "react";
import styles from "./Footer.module.css"; // Import the CSS module

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.section}>
        <div className={styles.connect}>
          <span>Get connected with us on social networks:</span>
        </div>
        <div className={styles.socialLinks}>
          <a href="" className={styles.socialLink}>
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="" className={styles.socialLink}>
            <i className="fab fa-twitter"></i>
          </a>
          <a href="" className={styles.socialLink}>
            <i className="fab fa-google"></i>
          </a>
          <a href="" className={styles.socialLink}>
            <i className="fab fa-instagram"></i>
          </a>
          <a href="" className={styles.socialLink}>
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="" className={styles.socialLink}>
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>

      <section className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <h6 className={styles.title}>
              <i className="fas fa-gem"></i> QuickLoan
            </h6>
            <p>
              We Help to Complete Your Dream , We Provide you{" "}
              <span
                style={{ color: "red", fontSize: "16px", fontWeight: "bold" }}
              >
                Trustable
              </span>{" "}
              <span
                style={{
                  color: "InfoText",
                  fontSize: "16px",
                  fontWeight: "bold"
                }}
              >
                Scable
              </span>{" "}
              and{" "}
              <span
                style={{
                  color: "slateblue",
                  fontSize: "16px",
                  fontWeight: "bold"
                }}
              >
                Flaxiable
              </span>{" "}
              Amouth of Loan For You Dream
            </p>
          </div>
          <div className={styles.column}>
            <h6 className={styles.title}>Products</h6>
            <p>
              <a href="#!" className={styles.link}>
                Loan
              </a>
            </p>
          </div>

          <div className={styles.column}>
            <h6 className={styles.title}>Contact</h6>
            <p>
              <i className="fas fa-home"></i> 9549880557
            </p>
            <p>
              <i className="fas fa-envelope"></i> Worldpay472@gmail.com
            </p>
          </div>
        </div>
      </section>

      <div className={styles.copy}>
        <a href="#" className={styles.link}>
          Worldpay472@gmail.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
