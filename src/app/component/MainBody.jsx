"use client";
import React from "react";
import Left from "./Left";
import Right from "./Right";
import "../component/mainbody.css";
const MainBody = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 leftbox">
            <Left />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBody;
