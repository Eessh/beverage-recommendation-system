import { useGlobalContext } from "../../GlobalContext";
import { TBeverage } from "../../Types";
import { Button } from "../Animated";
import "./RemovableBeverageCard.css";

type TRemovableBeverageCardProps = {
  beverage: TBeverage,
}

const RemovableBeverageCard = ({ beverage }: TRemovableBeverageCardProps) => {
  
  const { setCart } = useGlobalContext();
  
  const handleRemove = () => {
    setCart((prevCart) => {
      return prevCart.filter((cartBeverage) => cartBeverage!=beverage);
    });
  };

  return (
		<div
			className="RemovableBeverageCard relative flex flex-col p-2 rounded-xl h-fit w-fit shadow-xl ml-4"
		>
			<img
				className="rounded-xl w-56 h-56 mb-2"
				src={beverage.imgSrc}
				alt={beverage.imgAlt ? beverage.imgAlt : ""}
			/>
			<p className="text-xl font-semibold text-black mb-1">{beverage.name}</p>
			<div className="flex flex-row justify-between items-center mt-1">
				<span className="text-xl font-medium text-black">${beverage.price}</span>
				<Button
					onClick={handleRemove}
					overrideDefaultStyles={true}
					classes="viewmore px-4 py-2 rounded-xl flex-end"
				>Remove</Button>
			</div>
		</div>
  );
};

export default RemovableBeverageCard;