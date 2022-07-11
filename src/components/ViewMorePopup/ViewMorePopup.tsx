import { useState } from "react";
import { Close } from "../../assets/icons";
import { useGlobalContext } from "../../GlobalContext";
import { Button } from "../Animated";
import QuantityHandler from "../QuantityHandler";
import "./ViewMorePopup.css";

const ViewMorePopup = () => {
  const {
    activeBeverage,
    setMoreInfoVisible,
    setCart
  } = useGlobalContext();
  const [quantity, setQuantity] = useState<number>(1);
  
  const handleAddToCart = () => {
    setCart((prevCart) => {
      return [...prevCart, activeBeverage];
    });
  };

  return(
    <div className="ViewMorePopup p-4 rounded-xl">
      <span className="flex flex-row justify-end">
        <Button
          onClick={() => setMoreInfoVisible(false)}
          overrideDefaultStyles={true}
          classes="bg-pink p-2 rounded-xl"
        >
          <Close />
        </Button>
      </span>
      <div className="flex flex-row justify-start p-4">
        <div className="flex-1 p-2 flex flex-col">
          <img
            className="rounded-xl w-full max-w-screen-sm mb-4"
            src={activeBeverage.imgSrc}
            alt={activeBeverage.imgAlt ? activeBeverage.imgAlt : ""}
          />
          <span className="flex flex-row justify-between items-center mb-2">
            <span className="text-2xl font-semibold">$ {activeBeverage.price}</span>
            <QuantityHandler
              quantity={quantity}
              setQuantity={setQuantity}
              quantityAvailable={activeBeverage.quantityAvailable}
            />
          </span>
          <span className="text-lg font-normal mb-4">Quantity Available: {activeBeverage.quantityAvailable}</span>
          <Button
            overrideDefaultStyles={true}
            classes="bg-green flex-1 rounded-xl py-2 font-medium text-lg"
            onClick={handleAddToCart}
          >Add to Cart</Button>
        </div>
        <div className="flex-1 flex flex-col ml-8">
          <span className=" text-2xl font-semibold">{activeBeverage.name}</span>
          <br />
          <span className="text-lg font-normal">{activeBeverage.description}</span>
        </div>
      </div>
    </div>
  );
};

export default ViewMorePopup;