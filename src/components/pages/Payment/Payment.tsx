import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Close, Database, Done } from "../../../assets/icons";
import { BeverageLogo } from "../../../assets/images";
import { useGlobalContext } from "../../../GlobalContext";
import { getDominantEmotion, getWeatherFromCode } from "../../../RecommendationSystem";
import { getBeveragesForTag } from "../../../TaggingSystem";
import { TBeverages, TTags } from "../../../Types";
import { Button, Spinner } from "../../Animated";
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
  const imageDiv = useRef<HTMLDivElement | null>(null);
  const paymentDiv = useRef<HTMLDivElement | null>(null);
  const tasksDiv = useRef<HTMLDivElement | null>(null);
  const [payBtnClicked, setPayBtnClicked] = useState<boolean>(false);
  const [paymentDone, setPaymentDone] = useState<boolean>(false);
  const [transactionProcessCompleted, setTransactionProcessCompleted] = useState<boolean>(false);
  const [transactionAdded, setTransactionAdded] = useState<boolean>(false);
  
  const getTotalPayment = () => {
    let total = 0;
    cart.forEach((beverage) => {
      total += beverage.price;
    })
    return total;
  };
  
  const handlePay = () => {
    setPayBtnClicked(true);
    setTimeout(() => {setPaymentDone(true);}, 300);

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
      const noDups = [... new Set(beverages)];
      return noDups;
    }

    const options = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        transaction: {
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
    fetch("https://beverage-recommendation-system.herokuapp.com/transactions", options)
    .then((res) => {
      setTransactionProcessCompleted(true);
      res.json().then((body) => {
        if (res.status === 400) {
          console.log("Log: Bad request for getting transactions, Info: ", body.info);
        }
        else if (res.status === 500) {
          console.log("Log: Server Error while getting transactions, Info: ", body.info);
        }
        else {
          setTransactionAdded(true);
        }
        setCart([]);
        setVisitedRecommendationsPage(false);
        setTimeout(() => navigate("/"), 500);
      });
    })
    .catch((err) => console.log("Log: Error while adding transaction: ", err));
  };
  
  return (
    <div className="Payment">
      {!payBtnClicked && <div ref={imageDiv} className="image">
        <img src={BeverageLogo} className="drink-logo-image" />
      </div>}
      <div ref={paymentDiv} className="payment">
        <span className="pay-float">
          <p className="info">Payment Total</p>
          <p className="total">$ {getTotalPayment().toFixed(2)}</p>
          <Button
            overrideDefaultStyles={true}
            classes="pay-btn"
            onClick={handlePay}
          >Pay</Button>
        </span>
      </div>
      {payBtnClicked && <div ref={tasksDiv} className="tasks">
        <div className="tasks--list">
          <span className="tasks--list--item">
            <span className="tasks--list--item--name">Processing Payment</span>
            {paymentDone ? <Done /> : <Spinner />}
          </span>
          <span className="tasks--list--item">
            <span className="tasks--list--item--name">Adding transaction to Database</span>
            {
              !transactionProcessCompleted
              ? <Spinner />
              : transactionAdded
                ? <Done />
                : <Close />
            }
          </span>
        </div>
      </div>}
    </div>
  );
};

export default Payment;