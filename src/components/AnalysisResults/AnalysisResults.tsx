import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import "./AnalysisResults.css";

// Props returned after VideoStream analysis
type TProps = {};

const AnalysisResults: React.FC<TProps> = () => {
  const navigate = useNavigate();
  const {
    age,
    gender,
    emotions
  } = useGlobalContext();

  useEffect(() => {
    console.log("Log: Age: ", age);
    console.log("Log: Gender: ", gender);
    console.log("Log: Emotions: ", emotions);
    // navigates to recommendations page in 5 seconds
    setTimeout(() => navigate("/recommendations"), 5000);
  }, []);

  const getDominantEmotion = (): string => {
    console.log("Log: Inside getDominantEmotion()");
    console.log("Log: Emotions: ", emotions);
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

  return(
    <div className="AnalysisResults">
      <span className="age">Estimated Age: {age}</span>
      <span className="gender">Estimated Gender: {gender}</span>
      <span className="emotion">Dominant Emotion: {getDominantEmotion()}</span>
    </div>
  );
};

export default AnalysisResults;
