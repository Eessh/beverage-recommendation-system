import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext, TEmotions } from "../../GlobalContext";
import { IBeveragePercent } from "../VideoComponent";
import { AgeRanges, BeverageTypes, FemaleBeveragesData, MaleBeveragesData, EmotionsData } from "../VideoComponent/data";
import "./AnalysisResults.css";

const AnalysisResults = () => {
  const navigate = useNavigate();
  const {
    age,
    gender,
    emotions,
    setRecommendations
  } = useGlobalContext();

  useEffect(() => {
    console.log("Log: Age: ", age);
    console.log("Log: Gender: ", gender);
    console.log("Log: Emotions: ", emotions);
    setRecommendations({
        ageGender: ageGenderRecommendations(gender, age),
        emotions: emotionRecommendations(emotions),
        weather: [],
        temperature: [],
        season: []
    });

    // navigates to recommendations page in 5 seconds
    setTimeout(() => {
      navigate("/recommendations");
    }, 5000);
  }, []);

  const getDominantEmotion = (emotions: TEmotions): string => {
    let dominantEmotion: string = "", emotionValue: number = 0;
    Object.entries(emotions).forEach(pair => {
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

  return(
    <div className="AnalysisResults">
      <span className="age">Estimated Age: {age}</span>
      <span className="gender">Estimated Gender: {gender}</span>
      <span className="emotion">Dominant Emotion: {getDominantEmotion(emotions)}</span>
    </div>
  );
};

export default AnalysisResults;
