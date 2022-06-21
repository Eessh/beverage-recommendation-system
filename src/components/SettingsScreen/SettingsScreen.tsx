import React from "react";
import "./SettingsScreen.css";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const SettingsScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="settings-screen-root">
      <div className="settings-top-toolbar">
        <h1>Settings</h1>

        <AiOutlineClose
          size={32}
          className="settings-close-icon"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    </div>
  );
};

export default SettingsScreen;
