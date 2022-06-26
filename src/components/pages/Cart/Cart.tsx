import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../GlobalContext";
import { Button, Modal } from "../../Animated";
import RemovableBeverageCard from "../../RemovableBeverageCard";
import RecommendationsPrompt from "../../RecommendationsPrompt";
import "./Cart.css";
import Yen from "../../../assets/icons/Yen";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    recommendationsPromptVisible,
    visitedRecommendationsPage,
    setRecommendationsPromptVisible
  } = useGlobalContext();
  
  const handlePayClick = () => {
    if (!visitedRecommendationsPage) {
      setRecommendationsPromptVisible(true);
    }
    else {
      navigate("/payment");
    }
  };
  
  return (
    <div className="Cart">
      {cart.map((beverage, index) => {
        return <RemovableBeverageCard key={index} beverage={beverage}/>
      })}
			<Button
				onClick={handlePayClick}
				overrideDefaultStyles={true}
				classes="cart-btn rounded-xl shadow-2xl"
			>
				<span className="cart-icon"><Yen /></span>
				<span>Pay</span>
			</Button>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {
          recommendationsPromptVisible && <Modal close={() => setRecommendationsPromptVisible(false)}>
            <RecommendationsPrompt />
          </Modal>
        }
      </AnimatePresence>
    </div>
  );
};

export default Cart;