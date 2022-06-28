import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Right } from "../../../assets/icons";
import { Logo } from "../../../assets/images";
import Beverages from "../../../TaggingSystem/BeveragesData";
import { TBeverage } from "../../../Types";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [mostBoughtBeverage, setMostBoughtBeverage] = useState<TBeverage | null>(null);
  
  useEffect(() => {
    getMostBoughtBeverage();
  }, []);
  
  const getMostBoughtBeverage = () => {
    const options = {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    }
    fetch("http://localhost:5000/mostBought", options)
    .then((res) => res.json())
    .then((data) => {
      Beverages.forEach((beverage) => {
        if (beverage.name == data.mostBought) {
          setMostBoughtBeverage(beverage);
        }
      });
    })
    .catch((err) => {
      console.log("Log: Error while fetching most bought beverage: ", err);
    });
  };
  
  const handleOpen = () => {
    navigate("/beverages");
  };

  return (
    <div className="Homepage">
      <div className="left">
        <span className="float">
          <p className="title">Beverage Recommendation System</p>
          <p className="powered">Powered by</p>
          <span className="logo-container">
            <img src={Logo}/>
          </span>
        </span>
        <button className="open-btn" onClick={handleOpen}>
          <span>Open</span>
          <span className="open-btn-arrow"><Right /></span>
        </button>
      </div>
      <div className="right">
        <img className="image" src={mostBoughtBeverage?.imgSrc}/>
      </div>
    </div>
  );
};

export default Home;