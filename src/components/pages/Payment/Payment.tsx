import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Database, Done } from "../../../assets/icons";
import { useGlobalContext } from "../../../GlobalContext";
import { getDominantEmotion, getWeatherFromCode } from "../../../RecommendationSystem";
import { getBeveragesForTag } from "../../../TaggingSystem";
import { TBeverages, TTags } from "../../../Types";
import { Button } from "../../Animated";
import "./Payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const {
    cart,
    gender,
    age,
    emotions,
    weatherCode,
    temperature,
    recommendations,
    setCart,
    setVisitedRecommendationsPage
  } = useGlobalContext();
  const [status, setStatus] = useState<string>("");
  
  const getTotalPayment = () => {
    let total = 0;
    cart.forEach((beverage) => {
      total += beverage.price;
    })
    return total;
  };
  
  const handlePay = () => {
    setStatus("adding");

    const getBeverageNamesFromCart = (cart: TBeverages): string[] => {
      const names: string[] = [];
      cart.forEach((bevrage) => names.push(bevrage.name));
      return names;
    };

    const getAllRecommendedBeverages = (tags: TTags): string[] => {
      const beverages: string[] = [];
      tags.forEach(tag => {
        getBeveragesForTag(tag).forEach(beverage => {
          beverages.push(beverage.name);
        });
      });
      return beverages;
    }

    const options = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        data: {
          season: "rainy",
          gender: gender,
          age: age,
          emotion: getDominantEmotion(emotions),
          weather: getWeatherFromCode(weatherCode),
          temperature: temperature,
          beverages: getBeverageNamesFromCart(cart),
          recommended_beverages: getAllRecommendedBeverages(recommendations.emotions)
        }
      })
    };
    fetch("http://localhost:5000/transactions", options)
    .then(() => {
      setCart([]);
      setVisitedRecommendationsPage(false);
      setStatus("done");
      setTimeout(() => navigate("/"), 200);
    })
    .catch((err) => console.log("Log: Error while adding transaction: ", err));
  };
  
  return (
    <div className="Payment">
      <div className="left">
        <span className="pay-float">
          <p className="info">Payment Total</p>
          <p className="total">$ {getTotalPayment()}</p>
          <Button
            overrideDefaultStyles={true}
            classes="pay-btn"
            onClick={handlePay}
          >Pay</Button>
        </span>
      </div>
      <div className="right">
        {
          status == ""
          ? <></>
          : status == "adding"
            ? <AddingToDatabase />
            : <PaymentDone />
        }
      </div>
    </div>
  );
};

const AddingToDatabase = () => {
  return (
    <div className="AddingToDatabase">
      <span className="adding-info">Adding to Database</span>
      <span className="database-icon"><Database /></span>
    </div>
  );
};

const PaymentDone = () => {
  return (
    <div className="PaymentDone">
      <span className="payment-info">Payment Done</span>
      <span className="done-icon"><Done /></span>
    </div>
  );
};

export default Payment;