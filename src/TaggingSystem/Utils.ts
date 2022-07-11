import { TBeverage, TBeverages } from "../Types";
import Tags from "./Tags";
import Beverages from "./BeveragesData";

const getBeveragesForTag = (tag: string): TBeverages => {
	if (Tags.find((beverageTag) => tag===beverageTag) === undefined) {
		throw new Error("Error: Unidentified Tag!");
	}
	const beverages: TBeverages = [];
	Beverages.forEach((beverage) => {
		if (beverage.tags.find((beverageTag) => tag===beverageTag) !== undefined) {
			beverages.push(beverage);
		}
	});
	return beverages;
};

const getBeverageByName = (name: string): TBeverage => {
	Beverages.forEach((beverage) => {
		if (beverage.name == name) {
			return beverage;
		}
	});
	throw new Error(`Error: cannot find beverage with name: ${name}`);
};

export {
  getBeveragesForTag,
  getBeverageByName
};