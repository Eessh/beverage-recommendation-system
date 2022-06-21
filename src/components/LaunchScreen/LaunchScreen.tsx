import "./LaunchScreen.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";

const LaunchScreen = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>This is launch screen</h1>
      <div
        onClick={() => {
          navigate("/");
        }}
      ></div>
    </div>
  );
};

export default LaunchScreen;
