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
        overrideDefaultStyles={true}
        classes="p-1 rounded-xl bg-slate-200 h-fit mr-2"
        onClick={() => {quantity>1 ? setQuantity(quantity-1) : null}}
      >
        <Minus />
      </Button>
      <span className="text-xl font-bold">{quantity}</span>
      <Button
        overrideDefaultStyles={true}
        classes="p-1 rounded-xl bg-slate-200 h-fit ml-2"
        onClick={() => {quantity<quantityAvailable ? setQuantity(quantity+1) : null}}
      >
        <Plus />
      </Button>
    </span>
  );
};

export default QuantityHandler;