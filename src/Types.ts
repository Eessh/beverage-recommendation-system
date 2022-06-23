export type TAgeRange = {
  lower: number;
  upper: number;
};

export type TTag = string;
export type TTags = string[];

export type TBeverage = {
  name: string;
  description: string;
  price: number;
  quantityAvailable: number;
  tags: TTag[];
  imgSrc: string;
  imgAlt?: string;
};
export type TBeverages = TBeverage[];
export type TBeveragePercent = {
  tag: TTag;
  percent: number;
};

export type TEmotions = {
  happy: number;
  sad: number;
  neutral: number;
  angry: number;
  surprised: number;
  fearful: number;
  disgusted: number;
};
export type TEmotionsWeights = TEmotions;
export type TEmotionsData = {
  happy: TTags;
  sad: TTags;
  neutral: TTags;
  angry: TTags;
  fear: TTags;
  disgusted: TTags;
  surprise: TTags;
};
export type TValidEmotions =
  | "happy"
  | "sad"
  | "disgusted"
  | "angry"
  | "surprise"
  | "neutral"
  | "fear";

export type TWeatherData = {
  clearSky: TTags;
  rain: TTags;
  snow: TTags;
  thunderstorm: TTags;
};

export type TTemperatureData = {
  cold: TTags;
  warm: TTags;
  hot: TTags;
};

export type TRecommendations = {
  ageGender: TTags;
  emotions: TTags;
  weather: TTags;
  temperature: TTags;
  season: TTags;
};

export type TEmotionRecommendation = {
  emotions: TTags;
};
