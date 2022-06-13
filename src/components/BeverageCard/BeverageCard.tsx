import { TBeverage } from "../../Types";
import { Button } from "../Animated";
import { useGlobalContext } from "../../GlobalContext";

type TBeverageCardProps = {
	beverage: TBeverage
};

const BeverageCard: React.FC<TBeverageCardProps> = ({ beverage }) => {
	const { setActiveBeverage, setMoreInfoVisible } = useGlobalContext();

	const handleClick = () => {
		setActiveBeverage(beverage);
		setMoreInfoVisible(true);
	};

	return (
		<div
			onClick={handleClick}
			className="relative flex flex-col p-2 rounded-xl bg-gray-50 h-fit shadow-xl ml-4 cursor-pointer hover:scale-105 transition-all"
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
					onClick={() => setMoreInfoVisible(true)}
					// overrideDefaultStyles={true}
					classes="px-2 py-1 rounded-xl bg-gray-200 flex-end"
				>View more</Button>
			</div>
		</div>
	);
};

export default BeverageCard;