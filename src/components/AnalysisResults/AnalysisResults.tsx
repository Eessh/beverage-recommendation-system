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

  return(
    <div className="AnalysisResults"></div>
  );
};

export default AnalysisResults;
