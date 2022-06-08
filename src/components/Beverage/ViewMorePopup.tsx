import React, { useState } from "react";
import { QuantityHandler } from ".";
import { Button } from "../Animated";
import { Close } from "../../assets/icons";

interface IProps {
  title: string,
  description: string,
  imgSrc: string,
  imgAlt?: string,
  price: number,
  quantityAvailable: number,
  setMoreInfoVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ViewMorePopup: React.FC<IProps> = ({title, description, imgSrc, imgAlt, price, quantityAvailable, setMoreInfoVisible}) => {
  const [quantity, setQuantity] = useState<number>(1);

  return(
    <div className="ViewMorePopup bg-slate-50 p-4 rounded-xl">
      <span className="flex flex-row justify-end">
        <Button
          onClick={() => setMoreInfoVisible(false)}
          overrideDefaultStyles={true}
          classes="p-2 bg-slate-200 rounded-xl"
        >
          <Close />
        </Button>
      </span>
      <div className="flex flex-row justify-start p-4">
        <div className="flex-1 p-2 flex flex-col">
          <img
            className="rounded-xl w-full max-w-screen-sm mb-4"
            src={imgSrc}
            alt={imgAlt ? imgAlt : ""}
          />
          <span className="flex flex-row justify-between items-center mb-2">
            <span className="text-2xl font-semibold">$ {price}</span>
            <QuantityHandler
              quantity={quantity}
              setQuantity={setQuantity}
              quantityAvailable={quantityAvailable}
            />
          </span>
          <span className="text-lg font-normal mb-4">Quantity Available: {quantityAvailable}</span>
          <Button
            overrideDefaultStyles={true}
            classes="flex-1 bg-slate-200 rounded-xl py-2 font-medium text-lg"
          >Add to Cart</Button>
        </div>
        <div className="flex-1 flex flex-col ml-8">
          <span className=" text-2xl font-semibold">{title}</span>
          <br />
          <span className="text-lg font-normal">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default ViewMorePopup;