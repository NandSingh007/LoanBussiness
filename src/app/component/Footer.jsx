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
              <i className="fas fa-gem"></i> Company name
            </h6>
            <p>
              Here you can use rows and columns to organize your footer content.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
          <div className={styles.column}>
            <h6 className={styles.title}>Products</h6>
            <p>
              <a href="#!" className={styles.link}>
                Angular
              </a>
            </p>
            <p>
              <a href="#!" className={styles.link}>
                React
              </a>
            </p>
            <p>
              <a href="#!" className={styles.link}>
                Vue
              </a>
            </p>
            <p>
              <a href="#!" className={styles.link}>
                Laravel
              </a>
            </p>
          </div>
          <div className={styles.column}>
            <h6 className={styles.title}>Useful links</h6>
            <p>
              <a href="#!" className={styles.link}>
                Pricing
              </a>
            </p>
            <p>
              <a href="#!" className={styles.link}>
                Settings
              </a>
            </p>
            <p>
              <a href="#!" className={styles.link}>
                Orders
              </a>
            </p>
            <p>
              <a href="#!" className={styles.link}>
                Help
              </a>
            </p>
          </div>
          <div className={styles.column}>
            <h6 className={styles.title}>Contact</h6>
            <p>
              <i className="fas fa-home"></i> New York, NY 10012, US
            </p>
            <p>
              <i className="fas fa-envelope"></i> info@example.com
            </p>
            <p>
              <i className="fas fa-phone"></i> + 01 234 567 88
            </p>
            <p>
              <i className="fas fa-print"></i> + 01 234 567 89
            </p>
          </div>
        </div>
      </section>

      <div className={styles.copy}>
        <p>
          © 2021 Copyright:
          <a href="https://mdbootstrap.com/" className={styles.link}>
            {" "}
            MDBootstrap.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
