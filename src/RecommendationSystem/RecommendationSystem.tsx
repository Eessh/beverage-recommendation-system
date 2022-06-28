import {
  AgeGenderBeverageTags,
  AgeRanges,
  MaleBeveragesData,
  FemaleBeveragesData,
} from "./AgeGenderData";
import { EmotionsData, EmotionsWeights } from "./EmotionsData";
import WeatherData from "./WeatherData";
import TemperatureData from "./TemperatureData";
import { TEmotions, TBeveragePercent, TTags, TEmotionsData } from "../Types";
import { useGlobalContext } from "../GlobalContext";

const applyWeights = (emotions: TEmotions): TEmotions => {
  return {
    happy: emotions.happy * EmotionsWeights.happy,
    sad: emotions.sad * EmotionsWeights.sad,
    neutral: emotions.neutral * EmotionsWeights.neutral,
    angry: emotions.angry * EmotionsWeights.angry,
    fearful: emotions.fearful * EmotionsWeights.fearful,
    surprised: emotions.surprised * EmotionsWeights.surprised,
    disgusted: emotions.disgusted * EmotionsWeights.disgusted,
  };
};

const getDominantEmotion = (emotions: TEmotions): string => {
  let dominantEmotion: string = "",
    emotionValue: number = 0;
  const resultantEmotions = applyWeights(emotions);
  console.log("Log: Emotions before applying weights: ", emotions);
  console.log("Log: Emotions after applying weights: ", resultantEmotions);
  Object.entries(resultantEmotions).forEach((pair) => {
    if (pair[1] > emotionValue) {
      dominantEmotion = pair[0];
      emotionValue = pair[1];
    }
  });
  return dominantEmotion == "" ? "neutral" : dominantEmotion;
};

const getAgeIndex = (age: number): number => {
  let ans = 0;
  for (let i = 0; i < AgeRanges.length; i++) {
    if (AgeRanges[i].lower <= age && age <= AgeRanges[i].upper) {
      ans = i;
      break;
    }
  }
  return ans;
};

const ageGenderRecommendations = (
  gender: string | undefined,
  age: number | undefined
): TTags => {
  if (gender === undefined || age === undefined) return [];
  const recommendations: string[] = [];
  const dataIndex = getAgeIndex(age);
  const data: TBeveragePercent[] =
    gender === "male"
      ? MaleBeveragesData[dataIndex].map((value, index) => {
          return { tag: AgeGenderBeverageTags[index], percent: value };
        })
      : FemaleBeveragesData[dataIndex].map((value, index) => {
          return { tag: AgeGenderBeverageTags[index], percent: value };
        });
  data.sort((a, b) => {
    // return a.percent - b.percent;
    return b.percent - a.percent;
  });
  data.forEach((value) => recommendations.push(value.tag));
  return recommendations;
};

const emotionRecommendations = (
  emotions: TEmotions,
  currentEmotionsData: TEmotionsData
): TTags => {
  // const { emotionsData } = useGlobalContext();
  const dominantEmotion: string = getDominantEmotion(emotions);
  switch (dominantEmotion) {
    case "happy":
      return currentEmotionsData.happy;
    case "sad":
      return currentEmotionsData.sad;
    case "neutral":
      return currentEmotionsData.neutral;
    case "angry":
      return currentEmotionsData.angry;
    case "surprised":
      return currentEmotionsData.surprise;
    case "disgusted":
      return currentEmotionsData.disgusted;
    default:
      throw new Error("Error: Unrecognized dominantEmotion.");
  }
};

const getWeatherFromCode = (code: number): string => {
	switch (code) {
		case 0:
		case 1:
		case 2:
		case 3:
			// Clear sky
			return "Clear Sky";

		case 51:
		case 53:
		case 55:
		case 56:
		case 57:
		case 61:
		case 63:
		case 65:
		case 66:
		case 67:
		case 80:
		case 81:
		case 82:
			// Rain
			return "Rain";

		case 71:
		case 73:
		case 75:
		case 77:
		case 85:
		case 86:
			// Snow
			return "Snow";

		case 95:
		case 96:
		case 97:
			// Thunderstorm
			return "Thunderstorm";

		default:
			// Ignore other codes
			return "";
	}
};

const weatherRecommendations = (weatherCode: number): TTags => {
  switch (weatherCode) {
    case 0:
    case 1:
    case 2:
    case 3:
      // Clear sky
      return WeatherData.clearSky;

    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      // Rain
      return WeatherData.rain;

    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      // Snow
      return WeatherData.snow;

    case 95:
    case 96:
    case 97:
      // Thunderstorm
      return WeatherData.thunderstorm;

    default:
      // Ignore other codes
      return [];
  }
};
const temperatureRecommendations = (temperature: number): TTags => {
  if (temperature <= 20) return TemperatureData.cold;
  else if (21 <= temperature && temperature <= 30) return TemperatureData.warm;
  else return TemperatureData.hot;
};

export {
	getWeatherFromCode,
  ageGenderRecommendations,
  getDominantEmotion,
  emotionRecommendations,
  weatherRecommendations,
  temperatureRecommendations,
};
