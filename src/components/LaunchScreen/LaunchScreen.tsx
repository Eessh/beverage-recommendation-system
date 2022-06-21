import "./LaunchScreen.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import { IBYLogo, BeverageLogo, DrinkLogo } from "../../assets/images";

const LaunchScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="launch-screen-root">
      <img src={IBYLogo} className="iby-logo-image" />
      <img src={BeverageLogo} className="drink-logo-image" />
      <h1>Get Drink that fits your mood!</h1>
      <div
        className="start-button"
        onClick={() => {
          navigate("/detectionScreen");
        }}
      >
        click here
      </div>
    </div>
  );
};

export default LaunchScreen;
