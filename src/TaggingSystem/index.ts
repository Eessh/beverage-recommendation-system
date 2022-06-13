import {TBeverages, TTags} from "../Types";
import Beverages from "./BeveragesData";

const Tags: TTags = [
	"Carbonated Drinks",
	"Chocolate",
	"Coffee",
	"Cool Drinks",
	"Energy Drinks",
	"Healthy",
	"Juices",
	"Milk",
	"Tea",
	"Water"
];

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

export {
	Tags,
	getBeveragesForTag
};