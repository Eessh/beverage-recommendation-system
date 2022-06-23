import React from "react";
import "./SettingsScreen.css";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import { TEmotionsData } from "../../Types";
import Switch from "react-switch";
const SettingsScreen = () => {
  const navigate = useNavigate();
  const { setEmotionsData } = useGlobalContext();

  const testButtonHandler = () => {
    const newEmotionsData: TEmotionsData = {
      happy: ["Juices"],
      sad: ["Chocolate", "Tea", "Coffee"],
      neutral: ["Healthy", "Tea", "Coffee"],
      angry: ["Tea", "Coffee"],
      fear: ["Water"],
      disgusted: ["Water"],
      surprise: ["Water"],
    };
    setEmotionsData(newEmotionsData);
  };
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
      {/* <div className="retry-button" onClick={testButtonHandler}>
        test button
      </div> */}
      <div className="settings-body">
        <div className="emotions-tab-bar">
          <div className="emotions-tab-button">Neutral</div>
          <div className="emotions-tab-button">Happy</div>
          <div className="emotions-tab-button">Sad</div>
          <div className="emotions-tab-button">Surprise</div>

          <div className="emotions-tab-button">Angry</div>
          <div className="emotions-tab-button">Repulsive</div>
          <div className="emotions-tab-button">Fear</div>
        </div>
        <div className="emotions-option-container">
          <div className="emotions-option-item">
            <div className="emotion-option-itemName">
              <h1>Healthy</h1>
            </div>
            <Switch
              onChange={() => {}}
              checked={true}
              onColor="#ffd65c"
              offColor="#555"
              height={20}
              width={48}
            />
          </div>
          <div className="emotions-option-item">
            <div className="emotion-option-itemName">
              <h1>Coffee</h1>
            </div>
            <Switch
              onChange={() => {}}
              checked={true}
              onColor="#ffd65c"
              offColor="#555"
              height={20}
              width={48}
            />
          </div>
          <div className="emotions-option-item">
            <div className="emotion-option-itemName">
              <h1>Chocolate</h1>
            </div>
            <Switch
              onChange={() => {}}
              checked={true}
              onColor="#ffd65c"
              offColor="#555"
              height={20}
              width={48}
            />
          </div>
          <div className="emotions-option-item">
            <div className="emotion-option-itemName">
              <h1>Juice</h1>
            </div>
            <Switch
              onChange={() => {}}
              checked={true}
              onColor="#ffd65c"
              offColor="#555"
              height={20}
              width={48}
            />
          </div>
          <div className="emotions-option-item">
            <div className="emotion-option-itemName">
              <h1>Tea</h1>
            </div>
            <Switch
              onChange={() => {}}
              checked={true}
              onColor="#ffd65c"
              offColor="#555"
              height={20}
              width={48}
            />
          </div>

          <div className="emotions-option-item">
            <div className="emotion-option-itemName">
              <h1>Water</h1>
            </div>
            <Switch
              onChange={() => {}}
              checked={true}
              onColor="#ffd65c"
              offColor="#555"
              height={20}
              width={48}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
