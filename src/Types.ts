export type TTag = string;
export type TTags = string[];

export type TBeverage = {
	name: string,
	description: string,
	price: number,
	quantityAvailable: number,
	tags: TTag[],
	imgSrc: string,
	imgAlt?: string
};

export type TBeverages = TBeverage[];