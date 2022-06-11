import { useGlobalContext } from "../../GlobalContext";
import "./Recommendations.css";

// Props returned by AnalysisResults
// Actually AnalysisResults gets props from analysis of VideoStream, it just forwads it to this.
type TProps = {};

const Recommendations: React.FC<TProps> = () => {
  const { recommendations } = useGlobalContext();
  
  return(
    <div className="">
      {recommendations.map((x, index) => {
        return <div key={index}>{x}</div>
      })}
    </div>
  );
};

export default Recommendations;
