import { useState } from "react";
import { QuantityHandler } from ".";
import { Button } from "../Animated";
import { Close } from "../../assets/icons";

interface IProps {
  title: string,
  description: string,
  imgSrc: string,
  imgAlt?: string,
  price: number,
  quantityAvailable: number
}

const ViewMorePopup: React.FC<IProps> = ({title, description, imgSrc, imgAlt, price, quantityAvailable}) => {
  const [quantity, setQuantity] = useState<number>(1);

  return(
    <>
      <span className="flex flex-row justify-end">
        <Button
          overrideDefaultStyles={true}
          classes=""
          scaleOnHover={1.025}
          scaleOnTap={0.9}
        >
          <Close />
        </Button>
      </span>
      <div className="felx flex-row">
        <div className="flex-1">
          <span className="">{title}</span>
          <span className="">{description}</span>
        </div>
        <div className="flex-1">
          <img
            className="rounded-xl"
            src={imgSrc}
            alt={imgAlt ? imgAlt : ""}
          />
          <span className="flex flex-row justify-between items-center">
            <span>${price}</span>
            <QuantityHandler
              quantity={quantity}
              setQuantity={setQuantity}
              quantityAvailable={quantityAvailable}
            />
          </span>
          <span>Quantity Available: {quantityAvailable}</span>
          <Button>Add to Cart</Button>
        </div>
      </div>
    </>
  );
};

export default ViewMorePopup;