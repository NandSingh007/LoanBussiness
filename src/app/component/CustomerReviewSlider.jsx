"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import men from "../Image/slack_compressed-e1521621363404-360x360 (1).jpg";
import men1 from "../Image/client3.jpg";
import men2 from "../Image/client2.jpg";
import "./CustomerReviewSlider.css";
import Image from "next/image";

const CustomerReviewSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  const reviews = [
    {
      img: men,
      name: "Sushant Verma",
      profession: "Marvel Enterprises",
      text: "Great service and support. Highly recommend! The team was very responsive and ensured everything was delivered on time."
    },
    {
      img: men1,
      name: "Another User",
      profession: "Zara Textile Company",
      text: "Fantastic experience, very satisfied! The quality of work exceeded our expectations, and the attention to detail was impressive."
    },
    {
      img: men2,
      name: "Abinav Textile User",
      profession: "Infoses ",
      text: "Excellent quality and timely delivery! The team went above and beyond to ensure our requirements were met perfectly."
    }
  ];

  return (
    <div className="customer-review-slider">
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <div className="customer-review-box" key={index}>
            <div className="user-details">
              <div className="user-img">
                <span>
                  <Image src={review.img} alt={review.name} />
                </span>
                <h3 className="nameofuser">{review.name}</h3>
                <p className="profession">{review.profession}</p>
              </div>
              <div className="user-text-thought">{review.text}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomerReviewSlider;
