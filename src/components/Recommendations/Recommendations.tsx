import { useGlobalContext } from "../../GlobalContext";
import "./Recommendations.css";

const Recommendations = () => {
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
