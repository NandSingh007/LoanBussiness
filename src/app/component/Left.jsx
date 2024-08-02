"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import img from "../Image/loandimg.png";
import "slick-carousel/slick/slick.css";
import Ambitlogo from "../Image/Ambitlogo.jpg";
import AxisBank from "../Image/AxisBank-logo.png";
import fusion from "../Image/fusion.png";
import icic from "../Image/icic.png";
import men from "../Image/slack_compressed-e1521621363404-360x360 (1).jpg";
import loan from "../Image/iifl-loan.png";
import mintifi from "../Image/mintifi.jpg";
import step1 from "../Image/how.gif";
import aboutus from "../Image/about-us.gif";
import step2 from "../Image/step_2.gif";
import step3 from "../Image/step_3.gif";
import gif1 from "../Image/up-to-50-lakh.gif";
import gif2 from "../Image/lowest-rate.gif";
import gif3 from "../Image/collateral-fee.gif";
import gif4 from "../Image/low-processing-fee.gif";

import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loanvideo from "../Image/loanvideo.mp4";
import "slick-carousel/slick/slick-theme.css";
import "./left.css";
import CustomerReviewSlider from "./CustomerReviewSlider";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Left = () => {
  const [data, setData] = useState([]);
  const [statusOne, setStatusOne] = useState(0);
  const [statusTwo, setStatusTwo] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get token from cookies
        const token = Cookies.get("newtoken");
        if (token) {
          // Decode token to get userId
          const decoded = jwtDecode(token);
          const userId = decoded.userId;

          // Fetch data from API
          console.log(
            userId,
            "userIduserIduserIduserIduserIduserIduserIduserIduserIduserIduserId"
          );
          const response = await axios.get(
            `admin.quicklone.com/Statusendpoint/${userId}`
          );

          // Log response data
          console.log(
            response.data.statusOne,
            "response.data.statusOne",
            response.data.statusTwo
          );

          // Update state with fetched data
          setStatusOne(response.data.statusOne);
          setStatusTwo(response.data.statusTwo);
          // setDataFetched(true);
        } else {
          console.error("Token not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (e) => {
    e.preventDefault(); // Prevent default link behavior

    if (statusOne && statusTwo) {
      window.location.href = "/FinalPage"; // Navigate to FinalPage
    } else if (statusTwo && !statusOne) {
      window.location.href = "/DownloadPage"; // Navigate to DownloadPage
    } else {
      window.location.href = "/MultiStepForm"; // Navigate to MultiStepForm
    }
  };
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("admin.quicklone.com/FetchPackageDataController");
      const result = await res.json();
      setData(result);
    };
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="container main-box">
      <div className="row main-box-first">
        <div className="col-md-7">
          <h1 className="loan-left-text">
            Quick & <span className="highlight">Easy Collateral</span> Free{" "}
            <span className="highlight-red">Loans</span>
          </h1>
          <p className="loan-down-text">For all your Business Needs</p>
          <p className="application">
            <span>
              <Link
                className="application-link"
                href="/MultiStepForm"
                onClick={handleClick}
              >
                Apply Now
              </Link>
            </span>
          </p>
        </div>
        <div className="col-md-5 text-center d-flex justify-content-center">
          <Image src={img} alt="Loan" width="100%" />
        </div>
      </div>
      <div className="container" id="OurPackage">
        <div className="box-slider">
          <h5 className="partner">Our Partners</h5>
          <Slider {...settings}>
            <div className="col-md-3 box-img">
              <Image src={Ambitlogo} alt="Ambit" className="img-section" />
            </div>
            <div className="col-md-3 box-img">
              <Image src={AxisBank} alt="Axis Bank" className="img-section" />
            </div>
            <div className="col-md-3 box-img">
              <Image src={fusion} alt="Fusion" className="img-section" />
            </div>
            <div className="col-md-3 box-img">
              <Image src={icic} alt="ICIC" className="img-section" />
            </div>
            <div className="col-md-3 box-img">
              <Image src={loan} alt="Loan" className="img-section" />
            </div>
            <div className="col-md-3 box-img">
              <Image src={mintifi} alt="Mintifi" className="img-section" />
            </div>
          </Slider>
        </div>
      </div>
      <div className="what-we-offer" id="WhatWeOffer">
        <div className="container">
          <h5 className="partner">What We Offer</h5>
          <div className="row gif-box-row">
            <div className="col-md-3 col-sm-6 gif-box">
              <Image src={gif1} alt="50Lakh" className="gif-section-img" />
              <p className="gif-bottom-text">Up To 50 Lakh</p>
            </div>
            <div className="col-md-3 col-sm-6 gif-box">
              <Image src={gif2} alt="Lowest Rate" className="gif-section-img" />
              <p className="gif-bottom-text">Lowest Interest Rate</p>
            </div>
            <div className="col-md-3 col-sm-6 gif-box">
              <Image
                src={gif3}
                alt="Collateral Free"
                className="gif-section-img"
              />
              <p className="gif-bottom-text">Collateral Free Loans</p>
            </div>
            <div className="col-md-3 col-sm-6 gif-box">
              <Image src={gif4} alt="Low Fee" className="gif-section-img" />
              <p className="gif-bottom-text">Low Processing Fee</p>
            </div>
          </div>
        </div>
      </div>
      <div className="what-we-offer" id="WatchVideo">
        <div className="container">
          <h5 className="partner">Watch Video</h5>
          <div className="row watch-video">
            <video width="600" controls>
              <source src={loanvideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
      <div className="what-we-offer" id="KnowYourEMI">
        <div className="container">
          <h5 className="partner">Know Your EMI Now</h5>
          <div className="row watch-video">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              natus doloribus nesciunt explicabo voluptatum temporibus, eius
              alias tempora aut quas qui voluptas minus eos nam perferendis
              dicta, possimus maxime vel?
            </p>
          </div>
        </div>
      </div>
      <div className="what-we-offer" id="HowToApply">
        <div className="container">
          <h5 className="partner">How Do I Apply For a Loan?</h5>
          <div className="row steps-section">
            <div className="col-md-4 col-sm-12 steps">
              <div className="box-of-steps">
                <p className="step-number">Step 1</p>
                <h5 className="details">Fill out the application form</h5>
                <p className="step-description">
                  Fill out the application form by entering basic details
                  through Tradeudhaar Customer Journey.
                </p>
                <Image src={step1} alt="Step 1" className="step-gif" />
              </div>
            </div>
            <div className="col-md-4 col-sm-12 steps">
              <div className="box-of-steps">
                <p className="step-number">Step 2</p>
                <h5 className="details">Complete your application</h5>
                <p className="step-description">
                  Provide your basic documentation for taking a business loan
                  which includes GST, KYC documents.
                </p>
                <Image src={step2} alt="Step 2" className="step-gif" />
              </div>
            </div>
            <div className="col-md-4 col-sm-12 steps">
              <div className="box-of-steps">
                <p className="step-number">Step 3</p>
                <h5 className="details">Receive your Loan</h5>
                <p className="step-description">
                  Once your loan is sanctioned, you will receive the amount in
                  your bank account in a few working days.
                </p>
                <Image src={step3} alt="Step 3" className="step-gif" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-us-section" id="AboutUs">
        <div className="container">
          <h5 className="partner">About Us</h5>
          <div className="row align-items-center">
            <div className="col-md-6">
              <ul className="about-us-list">
                <li className="about-us-item">
                  Our company is committed to providing hassle-free loan
                  solutions to small and medium enterprises.
                </li>
                <li className="about-us-item">
                  We offer competitive interest rates and flexible repayment
                  options.
                </li>
              </ul>
            </div>
            <div className="col-md-6 text-center">
              <Image src={aboutus} alt="About Us" className="about-us-img" />
            </div>
          </div>
        </div>
      </div>
      <div className="container customer-review-slider" id="CustomerReview">
        <CustomerReviewSlider />
      </div>
    </div>
  );
};

export default Left;
