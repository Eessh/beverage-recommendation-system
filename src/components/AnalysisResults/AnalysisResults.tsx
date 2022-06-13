import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext, TEmotions } from "../../GlobalContext";
import { IBeveragePercent } from "../VideoComponent";
import { IconContext } from "react-icons";
import {
  AgeRanges,
  BeverageTypes,
  FemaleBeveragesData,
  MaleBeveragesData,
  EmotionsData,
  TWeatherAndTemperature,
  WeatherData,
  TemperatureData,
} from "../VideoComponent/data";
import "./AnalysisResults.css";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { FaChild } from "react-icons/fa";
// FaRegSmile FaRegAngry FaRegMeh FaRegFrown FaRegFlushed FaRegTired FaRegSurprise
import { FaRegAngry } from "react-icons/fa";
import { FaRegMeh } from "react-icons/fa";
import { FaRegSmile } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import { FaRegFrown } from "react-icons/fa";
import { FaRegSurprise } from "react-icons/fa";
import { FaRegTired } from "react-icons/fa";
import { GiFemale } from "react-icons/gi";
import { GiMale } from "react-icons/gi";

import { Gender } from "face-api.js";
import { Angry, Disgusted, Fear, Happy, Neutral, Sad, Surprised } from "../../assets/gifs";
type ageIconProp = {
  gender: string;
  age: number;
};

type genderIconProp = {
  gender: string;
};
type emotionIconProp = {
  emotion: string;
};
const AnalysisResults = () => {
  const navigate = useNavigate();
  const {
    age,
    gender,
    emotions,
    setWeatherCode,
    setTemperature,
    setRecommendations,
  } = useGlobalContext();

  useEffect(() => {
    fetchWeather();
    console.log("Log: Age: ", age);
    console.log("Log: Gender: ", gender);
    console.log("Log: Emotions: ", emotions);
    setRecommendations({
      ageGender: ageGenderRecommendations(gender, age),
      emotions: emotionRecommendations(emotions),
      weather: [],
      temperature: [],
      season: [],
    });
    // navigates to recommendations page in 5 seconds
    setTimeout(() => {
      navigate("/recommendations");
    }, 5000);
  }, []);
  // const { age, gender, emotions, setRecommendations } = useGlobalContext();
  //emotions is a object of form - {happy: 100, sad: 0, neutral: 0, angry: 0, surprised: 0, …}
  // const age = 14;
  // const gender = "male";
  // const emotions = "Happy";

  const weatherRecommendation = (weatherCode: number) => {
    switch (weatherCode) {
      case 0:
      case 1:
      case 2:
      case 3:
        // Clear sky
        setRecommendations((prev) => {
          return {
            ageGender: prev.ageGender,
            emotions: prev.emotions,
            weather: WeatherData.clearSky,
            temperature: prev.temperature,
            season: prev.season,
          };
        });
        break;

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
        setRecommendations((prev) => {
          return {
            ageGender: prev.ageGender,
            emotions: prev.emotions,
            weather: WeatherData.rain,
            temperature: prev.temperature,
            season: prev.season,
          };
        });
        break;

      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:
        // Snow
        setRecommendations((prev) => {
          return {
            ageGender: prev.ageGender,
            emotions: prev.emotions,
            weather: WeatherData.snow,
            temperature: prev.temperature,
            season: prev.season,
          };
        });
        break;

      case 95:
      case 96:
      case 97:
        // Thunderstorm
        setRecommendations((prev) => {
          return {
            ageGender: prev.ageGender,
            emotions: prev.emotions,
            weather: WeatherData.thunderstorm,
            temperature: prev.temperature,
            season: prev.season,
          };
        });
        break;

      default:
        // Ignore other codes
        break;
    }
  };
  const temperatureRecommendation = (temperature: number) => {
    if (temperature <= 20) {
      setRecommendations((prev) => {
        return {
          ageGender: prev.ageGender,
          emotions: prev.emotions,
          weather: prev.weather,
          temperature: TemperatureData.cold,
          season: prev.season,
        };
      });
    } else if (21 <= temperature && temperature <= 30) {
      setRecommendations((prev) => {
        return {
          ageGender: prev.ageGender,
          emotions: prev.emotions,
          weather: prev.weather,
          temperature: TemperatureData.warm,
          season: prev.season,
        };
      });
    } else {
      setRecommendations((prev) => {
        return {
          ageGender: prev.ageGender,
          emotions: prev.emotions,
          weather: prev.weather,
          temperature: TemperatureData.hot,
          season: prev.season,
        };
      });
    }
  };

  const fetchWeather = async () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&current_weather=true`
        )
          .then((res) => res.json())
          .then((data) => {
            const weatherCode = data.current_weather.weathercode;
            const temperature = data.current_weather.temperature;
            console.log("Log: Temperature: ", temperature);
            console.log("Log: WeatherCode: ", weatherCode);
            weatherRecommendation(weatherCode);
            temperatureRecommendation(temperature);
            setWeatherCode(data.current_weather.weathercode);
            setTemperature(data.current_weather.temperature);
          })
          .catch((err) =>
            console.log(
              "Error: while fetching weather, temperature data: ",
              err
            )
          );
      },
      (err) => {
        console.log("Error: Unable to get Geolocation: ", err);
      }
    );
  };

  const getDominantEmotion = (emotions: TEmotions): string => {
    let dominantEmotion: string = "",
      emotionValue: number = 0;
    Object.entries(emotions).forEach((pair) => {
      console.log("Log: Pair: ", pair);
      if (pair[1] > emotionValue) {
        dominantEmotion = pair[0];
        emotionValue = pair[1];
      }
    });
    return dominantEmotion;
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
  ): Array<string> => {
    if (gender === undefined || age === undefined) return [];
    const recommendations = new Array<string>();
    const dataIndex = getAgeIndex(age);
    const data: IBeveragePercent[] =
      gender === "male"
        ? MaleBeveragesData[dataIndex].map((value, index) => {
            return { type: BeverageTypes[index], percent: value };
          })
        : FemaleBeveragesData[dataIndex].map((value, index) => {
            return { type: BeverageTypes[index], percent: value };
          });
    data.sort((a, b) => {
      // return a.percent - b.percent;
      return b.percent - a.percent;
    });
    data.forEach((value) => recommendations.push(value.type));
    return recommendations;
  };

  const emotionRecommendations = (emotions: TEmotions): string[] => {
    const dominantEmotion: string = getDominantEmotion(emotions);
    switch (dominantEmotion) {
      case "happy":
        return EmotionsData.happy;
      case "sad":
        return EmotionsData.sad;
      case "neutral":
        return EmotionsData.neutral;
      case "angry":
        return EmotionsData.angry;
      case "surprised":
        return EmotionsData.surprise;
      case "disgusted":
        return EmotionsData.disgusted;
      default:
        throw new Error("Error: Unrecognized dominantEmotion.");
    }
  };

  const getAgeGroup = (age: number): string => {
    if (age < 13) {
      return "Child";
    } else if (age < 19) {
      return "Teenager";
    } else if (age < 30) {
      return "Young Adult";
    } else if (age < 50) {
      return "Adult";
    } else {
      return "Senior citizen";
    }
  };

  const AgeIcon = (input: ageIconProp) => {
    let gender = input.gender;
    let age = input.age;
    if (age < 15) {
      return <FaChild size={300} />;
    }

    if (gender === "male") {
      return <FaMale size={300} />;
    } else if (gender === "female") {
      return <FaFemale size={300} />;
    } else return <FaQuestion size={300} />;
  };

  const GenderIcon = (input: genderIconProp) => {
    let gender = input.gender;
    if (gender === "male") return <GiMale size={300} />;
    else if (gender === "female") return <GiFemale size={300} />;
    else return <FaQuestion size={300} />;
  };

  const EmotionIcon = (input: emotionIconProp) => {
    let emotion = input.emotion;
    if (emotion === "happy") return <FaRegSmile size={300} />;
    else if (emotion === "sad") return <FaRegFrown size={300} />;
    else if (emotion === "angry") return <FaRegAngry size={300} />;
    else if (emotion === "surprised") return <FaRegSurprise size={300} />;
    else if (emotion === "disgusted") return <FaRegTired size={300} />;
    else if (emotion === "neutral") return <FaRegMeh size={300} />;
    else return <FaQuestion />;
  };

  const EmotionGif = (dominantEmotion: string) => {
    switch (dominantEmotion) {
      case "happy":
        return <img src={Happy} width={300} height={300} />
      case "sad":
        return <img src={Sad} width={300} height={300} />
      case "neutral":
        return <img src={Neutral} width={300} height={300} />
      case "angry":
        return <img src={Angry} width={300} height={300} />
      case "fear":
        return <img src={Fear} width={300} height={300} />
      case "disgusted":
        return <img src={Disgusted} width={300} height={300} />
      case "surprised":
        return <img src={Surprised} width={300} height={300} />
      default:
        throw new Error("Error: Unrecognized emotion");
    }
  };

  const capitalize = (input: string) => {
    return input[0].toUpperCase() + input.slice(1);
  };

  return (
    <div>
      <div className="analysis-result-root">
        <span className="predictions-title">Predictions</span>
        <div className="predictions">
          <div className="age-container">
            <div className="age-float shadow-xl">
              <AgeIcon gender={gender} age={age} />
              <span className="description">
                <span className="description-for">Age:</span>
                <span className="age">{getAgeGroup(age)}</span>
              </span>
            </div>
          </div>
          <div className="gender-container">
            <div className="gender-float shadow-xl">
              <GenderIcon gender={gender} />
              <span className="description">
                <span className="description-for">Gender:</span>
                <span className="gender">{capitalize(gender)}</span>
              </span>
            </div>
          </div>
          {/* <span className="emotion">
          Dominant Emotion: {getDominantEmotion(emotions)}
        </span> */}
          <div className="emotion-container">
            {/* <EmotionIcon emotion={getDominantEmotion(emotions)} /> */}
            <div className="emotion-float">
              {EmotionGif(getDominantEmotion(emotions))}
              <span className="description">
                <span className="description-for">Emotion:</span>
                <span className="gender">{capitalize(getDominantEmotion(emotions))}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
//TODO: Add retry button in the analysisresult screen that should take the user back to the start of the flow
