import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext, TEmotions } from "../../GlobalContext";
import { IBeveragePercent } from "../VideoComponent";
import { IconContext } from "react-icons";

import {
  AgeRanges,
  BeverageTypes,
  FemaleBeveragesData,
  MaleBeveragesData,
  EmotionsData,
} from "../VideoComponent/data";
import "./AnalysisResults.css";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { FaChild } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import { GiFemale } from "react-icons/gi";
import { GiMale } from "react-icons/gi";

import { Gender } from "face-api.js";
type ageIconProp = {
  gender: string;
  age: number;
};

type genderIconProp = {
  gender: string;
};

const AnalysisResults = () => {
  const navigate = useNavigate();
  // const { age, gender, emotions, setRecommendations } = useGlobalContext();
  const age = 14;
  const gender = "male";
  const emotions = "Happy";

  useEffect(() => {
    console.log("Log: Age: ", age);
    console.log("Log: Gender: ", gender);
    console.log("Log: Emotions: ", emotions);
    // setRecommendations({
    //   ageGender: ageGenderRecommendations(gender, age),
    //   emotions: emotionRecommendations(emotions),
    //   weather: [],
    //   temperature: [],
    //   season: [],
    // });

    // navigates to recommendations page in 5 seconds
    // setTimeout(() => {
    //   navigate("/recommendations");
    // }, 5000);
  }, []);

  const getDominantEmotion = (emotions: TEmotions): string => {
    let dominantEmotion: string = "",
      emotionValue: number = 0;
    Object.entries(emotions).forEach((pair) => {
      console.log("Log: Pair: ", pair);
      if (pair[1] > emotionValue) {
        dominantEmotion = pair[0];
        emotionValue = pair[1];
      }
    });
    return dominantEmotion;
  };

  const getAgeIndex = (age: number): number => {
    let ans = 0;
    for (let i = 0; i < AgeRanges.length; i++) {
      if (AgeRanges[i].lower <= age && age <= AgeRanges[i].upper) {
        ans = i;
        break;
      }
    }
    return ans;
  };

  const ageGenderRecommendations = (
    gender: string | undefined,
    age: number | undefined
  ): Array<string> => {
    if (gender === undefined || age === undefined) return [];
    const recommendations = new Array<string>();
    const dataIndex = getAgeIndex(age);
    const data: IBeveragePercent[] =
      gender === "male"
        ? MaleBeveragesData[dataIndex].map((value, index) => {
            return { type: BeverageTypes[index], percent: value };
          })
        : FemaleBeveragesData[dataIndex].map((value, index) => {
            return { type: BeverageTypes[index], percent: value };
          });
    data.sort((a, b) => {
      // return a.percent - b.percent;
      return b.percent - a.percent;
    });
    data.forEach((value) => recommendations.push(value.type));
    return recommendations;
  };

  const emotionRecommendations = (emotions: TEmotions): string[] => {
    const dominantEmotion: string = getDominantEmotion(emotions);
    switch (dominantEmotion) {
      case "happy":
        return EmotionsData.happy;
      case "sad":
        return EmotionsData.sad;
      case "neutral":
        return EmotionsData.neutral;
      case "angry":
        return EmotionsData.angry;
      case "surprise":
        return EmotionsData.surprise;
      case "disgusted":
        return EmotionsData.disgusted;
      default:
        throw new Error("Error: Unrecognized dominantEmotion.");
    }
  };

  const getAgeGroup = (age: number): string => {
    if (age < 13) {
      return "Child";
    } else if (age < 19) {
      return "Teenager";
    } else if (age < 30) {
      return "Young Adult";
    } else if (age < 50) {
      return "Adult";
    } else {
      return "Senior citizen";
    }
  };

  const AgeIcon = (input: ageIconProp) => {
    let gender = input.gender;
    let age = input.age;
    if (age < 15) {
      return <FaChild size={80} />;
    }

    if (gender === "male") {
      return <FaMale size={80} />;
    } else if (gender === "female") {
      return <FaFemale size={80} />;
    } else return <FaQuestion size={80} />;
  };

  const GenderIcon = (input: genderIconProp) => {
    let gender = input.gender;
    if (gender === "male") return <GiMale size={80} />;
    else if (gender === "female") return <GiFemale size={80} />;
    else return <FaQuestion size={80} />;
  };

  return (
    <div className="analysis-result-root">
      <div className="age-container">
        <AgeIcon gender={gender} age={age} />
        <h1 className="age">{getAgeGroup(age)}</h1>
      </div>
      <div className="gender-container">
        <GenderIcon gender={gender} />
        <h1 className="gender">{gender}</h1>
      </div>
      {/* <span className="emotion">
        Dominant Emotion: {getDominantEmotion(emotions)}
      </span> */}
    </div>
  );
};

export default AnalysisResults;
