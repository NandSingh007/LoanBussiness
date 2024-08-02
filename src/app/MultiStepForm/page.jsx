"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../multistepform.css";
import Step1 from "../Step1/page";
import Step2 from "../Step2/page";
import Step3 from "../Step3/page";
import Step4 from "../Step4/page"; // Ensure the correct path to Step4 component
import Loading from "../component/Spinner"; // Ensure the correct path to Loading component

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {}
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNextStep = (stepData) => {
    setFormData((prevData) => ({
      ...prevData,
      [`step${currentStep}`]: stepData
    }));
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinalSubmit = (stepData) => {
    const updatedFormData = {
      ...formData,
      step4: stepData
    };
    setFormData(updatedFormData);
    setLoading(true);

    // Simulate data submission process during loading
    setTimeout(() => {
      router.push("/DownloadPage");
    }, 10000);
  };

  const renderStep = () => {
    if (loading) {
      return <Loading />;
    }

    switch (currentStep) {
      case 1:
        return <Step1 onNext={handleNextStep} />;
      case 2:
        return (
          <Step2
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            phone={formData.step1.phone}
            email={formData.step1.email}
          />
        );
      case 3:
        return (
          <Step3
            onSubmit={handleNextStep}
            onPrev={handlePrevStep}
            phone={formData.step1.phone}
            email={formData.step1.email}
          />
        );
      case 4:
        return (
          <Step4
            onSubmit={handleFinalSubmit}
            onPrev={handlePrevStep}
            phone={formData.step1.phone}
            email={formData.step1.email}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`multi-step-form ${loading ? "loading" : ""}`}>
      {!loading && (
        <div className="progress-indicator">
          <div className={`box ${currentStep >= 1 ? "completed" : ""}`}>1</div>
          <div className={`box ${currentStep >= 2 ? "completed" : ""}`}>2</div>
          <div className={`box ${currentStep >= 3 ? "completed" : ""}`}>3</div>
          <div className={`box ${currentStep >= 4 ? "completed" : ""}`}>4</div>
        </div>
      )}
      {renderStep()}
    </div>
  );
};

export default MultiStepForm;
