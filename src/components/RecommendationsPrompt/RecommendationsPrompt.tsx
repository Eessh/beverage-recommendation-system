import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import { Button } from "../Animated";
import "./RecommendationsPrompt.css";

const RecommendationsPrompt = () => {
  const navigate = useNavigate();
  const { setRecommendationsPromptVisible } = useGlobalContext();
  
  const handleYes = () => {
    setRecommendationsPromptVisible(false);
    navigate("/app");
  };
  const handleNo = () => {
    setRecommendationsPromptVisible(false);
    navigate("/payment");
  };
  
  return (
    <div className="RecommendationsPrompt">
      <span className="prompt-title">Would you like to see some beverages recommended for you ?</span>
      <div className="options">
        <Button
          overrideDefaultStyles={true}
          classes="prompt-yes"
          onClick={handleYes}>Yes</Button>
        <Button
          overrideDefaultStyles={true}
          classes="prompt-no"
          onClick={handleNo}>No</Button>
      </div>
    </div>
  );
};

export default RecommendationsPrompt;