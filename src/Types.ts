export type TAgeRange = {
	lower: number,
	upper: number
};

export type TEmotionsData = {
	happy: string[],
	sad: string[],
	neutral: string[],
	angry: string[],
	fear: string[],
	disgusted: string[],
	surprise: string[],
};

export type TWeatherData = {
	clearSky: string[],
	rain: string[],
	snow: string[],
	thunderstorm: string[]
};

export type TTemperatureData = {
	cold: string[],
	warm: string[],
	hot: string[]
};

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

export type TBeveragePercent = {
	tag: string,
	percent: number
};

export type TBeverages = TBeverage[];

export type TEmotions = {
	happy: number,
	sad: number,
	neutral: number,
	angry: number,
	surprised: number,
	fearful: number,
	disgusted: number
};
export type TEmotionsWeights = TEmotions;

export type TRecommendations = {
	ageGender: string[],
	emotions: string[],
	weather: string[],
	temperature: string[],
	season: string[]
};
