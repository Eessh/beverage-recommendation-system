import { Button } from "../Animated";
import {Plus, Minus} from "../../assets/icons";

interface IProps {
  quantity: number,
  setQuantity: React.Dispatch<React.SetStateAction<number>>,
  quantityAvailable: number
};

const QuantityHandler: React.FC<IProps> = ({quantity, setQuantity, quantityAvailable}) => {
  return(
    <span className="flex flex-row">
      <Button
        onClick={() => {quantity>1 ? setQuantity(quantity-1) : null}}
      >
        <Minus />
      </Button>
      <span>{quantity}</span>
      <Button
        onClick={() => {quantity<quantityAvailable ? setQuantity(quantity+1) : null}}
      >
        <Plus />
      </Button>
    </span>
  );
};

export default QuantityHandler;