import { Button } from "../Animated";
import { useGlobalContext } from "../../GlobalContext";

interface IProps {
  title: string,
  description: string,
  imgSrc: string,
  imgAlt?: string,
  price: number,
  quantityAvailable: number
}

const BeverageCard: React.FC<IProps> = ({title, description, imgSrc, imgAlt, price, quantityAvailable}) => {
  const { setActiveBeverage, setMoreInfoVisible } = useGlobalContext();

  const handleClick = () => {
    setActiveBeverage({title, description, imgSrc, imgAlt, price, quantityAvailable});
    setMoreInfoVisible(true);
  };

  return(
    <div
      onClick={handleClick}
      className="relative flex flex-col p-2 rounded-xl bg-gray-50 h-fit shadow-xl ml-4 cursor-pointer hover:scale-105 transition-all"
    >
      <img
        className="rounded-xl w-56 h-56 mb-2"
        src={imgSrc}
        alt={imgAlt ? imgAlt : ""}
      />
      <p className="text-xl font-semibold text-black mb-1">{title}</p>
      <div className="flex flex-row justify-between items-center mt-1">
        <span className="text-xl font-medium text-black">${price}</span>
        <Button
          onClick={() => setMoreInfoVisible(true)}
          // overrideDefaultStyles={true}
          classes="px-2 py-1 rounded-xl bg-gray-200 flex-end"
        >View more</Button>
      </div>
    </div>
  );
};

export default BeverageCard;