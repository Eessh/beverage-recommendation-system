import "./LaunchScreen.css";
import { useNavigate } from "react-router-dom";
import { IBYLogo, BeverageLogo } from "../../assets/images";

import { GiSettingsKnobs } from "react-icons/gi";

const LaunchScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="launch-screen-root">
      <div className="top-toolbar">
        <img src={IBYLogo} className="iby-logo-image" />
        <div
          className="settings-div"
          onClick={() => {
            navigate("/settings");
          }}
        >
          <GiSettingsKnobs size={36} />
        </div>
      </div>

      <img src={BeverageLogo} className="drink-logo-image" />
      <h1>Get Drink that fits your mood!</h1>
      <div
        className="start-button"
        onClick={() => {
          navigate("/detectionScreen");
        }}
      >
        <h1>Get started</h1>
      </div>
    </div>
  );
};

export default LaunchScreen;
