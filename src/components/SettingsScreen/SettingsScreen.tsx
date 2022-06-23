import React, { useState } from "react";
import "./SettingsScreen.css";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import { TEmotionsData, TValidEmotions } from "../../Types";
import Switch from "react-switch";
const SettingsScreen = () => {
  const navigate = useNavigate();
  const { emotionsData, setEmotionsData } = useGlobalContext();
  const [selectedEmotion, setSelectedEmotion] =
    useState<TValidEmotions>("neutral");
  const tagList: Array<string> = [
    "Healthy",
    "Coffee",
    "Tea",
    "Chocolate",
    "Water",
    "Juice",
  ];

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

  const getEmotionTabClassname = (emotionTab: string): string => {
    if (selectedEmotion === emotionTab) {
      return "emotions-tab-button-selected";
    }
    return "emotions-tab-button";
  };

  const getSwitchStatus = (tag: string): boolean => {
    return emotionsData[selectedEmotion].includes(tag);
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
          <div
            className={getEmotionTabClassname("neutral")}
            onClick={() => {
              setSelectedEmotion("neutral");
            }}
          >
            Neutral
          </div>
          <div
            className={getEmotionTabClassname("happy")}
            onClick={() => {
              setSelectedEmotion("happy");
            }}
          >
            Happy
          </div>
          <div
            className={getEmotionTabClassname("sad")}
            onClick={() => {
              setSelectedEmotion("sad");
            }}
          >
            Sad
          </div>
          <div
            className={getEmotionTabClassname("surprise")}
            onClick={() => {
              setSelectedEmotion("surprise");
            }}
          >
            Surprise
          </div>

          <div
            className={getEmotionTabClassname("angry")}
            onClick={() => {
              setSelectedEmotion("angry");
            }}
          >
            Angry
          </div>
          <div
            className={getEmotionTabClassname("disgusted")}
            onClick={() => {
              setSelectedEmotion("disgusted");
            }}
          >
            Disgusted
          </div>
          <div
            className={getEmotionTabClassname("fear")}
            onClick={() => {
              setSelectedEmotion("fear");
            }}
          >
            Fear
          </div>
        </div>
        <div className="emotions-option-container">
          {tagList.map((tag) => (
            <div className="emotions-option-item">
              <div className="emotion-option-itemName">
                <h1>{tag}</h1>
              </div>
              <Switch
                onChange={() => {}}
                checked={getSwitchStatus(tag)}
                onColor="#ffd65c"
                offColor="#555"
                height={20}
                width={48}
              />
            </div>
          ))}
          {/* <div className="emotions-option-item">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
