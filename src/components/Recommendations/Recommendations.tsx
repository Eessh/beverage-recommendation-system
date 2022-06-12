import { useGlobalContext } from "../../GlobalContext";
import "./Recommendations.css";

const Recommendations = () => {
  const { recommendations } = useGlobalContext();
  
  return(
    <div className="">
      {/* {recommendations.map((x, index) => {
        return <div key={index}>{x}</div>
      })} */}
      <div className={"text-2xl mt-4"}>Age & Gender based recommendations</div>
      {recommendations.ageGender.map((beverageType, index) => {
        return <div key={index}>{beverageType}</div>;
      })}
      <div className={"text-2xl mt-4"}>Emotion based recommendations</div>
      {recommendations.emotions.map((beverageType, index) => {
        return <div key={index}>{beverageType}</div>;
      })}
      <div className={"text-2xl mt-4"}>Weather based recommendations</div>
      {recommendations.weather.map((beverageType, index) => {
        return <div key={index}>{beverageType}</div>;
      })}
      <div className={"text-2xl mt-4"}>Temperature based recommendations</div>
      {recommendations.temperature.map((beverageType, index) => {
        return <div key={index}>{beverageType}</div>;
      })}
    </div>
  );
};

export default Recommendations;
