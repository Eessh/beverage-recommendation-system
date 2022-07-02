import React, { useEffect, useState } from "react";
import "./SettingsScreen.css";
import { AiFillPropertySafety, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import { TEmotionsData, TValidEmotions } from "../../Types";
import Switch from "react-switch";
import { EmotionsData } from "../../RecommendationSystem/EmotionsData";

type settingsScreenDisabledPropType = {
  enableFunc: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingsScreen = () => {
  const [enabled, setEnabled] = useState<boolean>(false);

  const SettingsScreenDisabled = (props: settingsScreenDisabledPropType) => {
    const [passcode, setPasscode] = useState<string>("");
    const [displayError, setDisplayError] = useState<boolean>(false);

    return (
      <div className="settings-disabled-root">
        <div className="passcode-dialog-box">
          <h1>Enter Pin</h1>
          <input
            className="pin-input"
            type="text"
            value={passcode}
            onChange={(event) => {
              displayError && setDisplayError(false);
              let passcode = event.target.value;
              console.log("passcode - ", passcode);
              setPasscode(passcode);
              if (passcode === "0000") props.enableFunc(true);
              else if (passcode.length === 5) {
                setDisplayError(true);
                setPasscode("");
              }
            }}
          ></input>
          {displayError && <h1 className="passcode-error-text">incorrect</h1>}
        </div>
      </div>
    );
  };

  const SettingsScreenEnabled = () => {
    const navigate = useNavigate();
    const { emotionsData, setEmotionsData } = useGlobalContext();
    const [selectedEmotion, setSelectedEmotion] =
      useState<TValidEmotions>("neutral");

    useEffect(() => {
      const localData = localStorage.getItem("emotionsData");
      console.log("from local storage - ", localData);
      const localDataJS = localData ? JSON.parse(localData) : EmotionsData;

      localData && setEmotionsData(JSON.parse(localData));
    }, []);

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
                  onChange={(value) => {
                    console.log("onChange value of switch - ", value);
                    setEmotionsData((prev: TEmotionsData): TEmotionsData => {
                      const index = prev[selectedEmotion].indexOf(tag);
                      let res: Array<string> = [];
                      if (index < 0) {
                        // res = prev[selectedEmotion].push(tag);
                        prev[selectedEmotion].push(tag);
                      } else {
                        // res = prev[selectedEmotion].splice(index);
                        prev[selectedEmotion].splice(index, 1);
                      }
                      console.log("new prev = ", prev);
                      return { ...prev };
                    });
                    localStorage.setItem(
                      "emotionsData",
                      JSON.stringify(emotionsData)
                    );
                  }}
                  checked={getSwitchStatus(tag)}
                  onColor="#ffd65c"
                  offColor="#555"
                  height={20}
                  width={48}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return enabled ? (
    <SettingsScreenEnabled />
  ) : (
    <SettingsScreenDisabled enableFunc={setEnabled} />
  );
};

export default SettingsScreen;
