import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import { IBeveragePercent } from "../VideoComponent";
import { AgeRanges, BeverageTypes, FemaleBeveragesData, MaleBeveragesData } from "../VideoComponent/data";
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
    setRecommendations(getRecommendations(gender, age));

    // navigates to recommendations page in 5 seconds
    setTimeout(() => {
      navigate("/recommendations");
    }, 5000);
  }, []);

  const getDominantEmotion = (): string => {
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

  const getRecommendations = (
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

  return(
    <div className="AnalysisResults">
      <span className="age">Estimated Age: {age}</span>
      <span className="gender">Estimated Gender: {gender}</span>
      <span className="emotion">Dominant Emotion: {getDominantEmotion()}</span>
    </div>
  );
};

export default AnalysisResults;
