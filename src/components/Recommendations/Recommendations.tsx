import { useGlobalContext } from "../../GlobalContext";
import "./Recommendations.css";

const Recommendations = () => {
  const { recommendations } = useGlobalContext();
  
  return(
    <div className="">
      {/* {recommendations.map((x, index) => {
        return <div key={index}>{x}</div>
      })} */}
      {recommendations.ageGender.map((bevarageType, index) => {
        return <div key={index}>{bevarageType}</div>;
      })}
      {recommendations.emotions.map((bevarageType, index) => {
        return <div key={index}>{bevarageType}</div>;
      })}
    </div>
  );
};

export default Recommendations;
