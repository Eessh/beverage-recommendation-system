import { useGlobalContext } from "../../GlobalContext";
import { getBeveragesForTag } from "../../TaggingSystem";
import BeverageCard from "../BeverageCard";

const BeverageViewHandler = () => {
	const { activeBeverageTag } = useGlobalContext();

	return (
		<div className="flex flex-row flex-wrap relative">
			<>
				{getBeveragesForTag(activeBeverageTag).map((beverage, index) => {
					return <BeverageCard
						key={index}
						beverage={beverage}
					/>
				})}
			</>
		</div>
	);
};

export default BeverageViewHandler;