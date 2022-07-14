import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import { getDominantEmotion } from "../../RecommendationSystem";
import "./AnalysisResults.css";
import {
  FaMale,
  FaFemale,
  FaChild,
  FaRegAngry,
  FaRegMeh,
  FaRegSmile,
  FaQuestion,
  FaRegFrown,
  FaRegSurprise,
  FaRegTired,
} from "react-icons/fa";
import { GiMale, GiFemale } from "react-icons/gi";
import {
  Angry,
  Disgusted,
  Fear,
  Happy,
  Neutral,
  Sad,
  Surprised,
} from "../../assets/gifs";
import {
  ageGenderRecommendations,
  emotionRecommendations,
  temperatureRecommendations,
  weatherRecommendations,
} from "../../RecommendationSystem";

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
    weatherCode,
    temperature,
    timeoutId,
    setWeatherCode,
    setTemperature,
    setRecommendations,
    setTimeoutId,
    setEmotionsRecommendation,
    emotionsData,
  } = useGlobalContext();

  useEffect(() => {
    // fetchWeather();
    //CONSIDERING ALL THE PARAMETERS -
    setRecommendations({
      ageGender: ageGenderRecommendations(gender, age),
      emotions: emotionRecommendations(emotions, emotionsData),
      weather: weatherRecommendations(weatherCode),
      temperature: temperatureRecommendations(temperature),
      season: [],
    });
    //CONSIDERING ONLY EMOTIONS -
    // setEmotionsRecommendation({
    //   emotions: emotionRecommendations(emotions),
    // });

    // navigates to recommendations page in 5 seconds
    const timeoutId = setTimeout(() => navigate("/recommendations"), 5000);
    setTimeoutId(timeoutId);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const retryButtonHandler = () => {
    clearTimeout(timeoutId);
    navigate("/");
  };

  // this function is not used as weather is not considered for recommendation
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
            setWeatherCode(weatherCode);
            setTemperature(temperature);
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
        return <img src={Happy} width={300} height={300} />;
      case "sad":
        return <img src={Sad} width={300} height={300} />;
      case "neutral":
        return <img src={Neutral} width={300} height={300} />;
      case "angry":
        return <img src={Angry} width={300} height={300} />;
      case "fear":
        return <img src={Fear} width={300} height={300} />;
      case "disgusted":
        return <img src={Disgusted} width={300} height={300} />;
      case "surprised":
        return <img src={Surprised} width={300} height={300} />;
      default:
        throw new Error("Error: Unrecognized emotion");
    }
  };

  const capitalize = (input: string) => {
    return input[0].toUpperCase() + input.slice(1);
  };

  return (
    <div className="analysis-result-top">
      <div className="analysis-result-root">
        <span className="predictions-title">Analysis Results</span>
        <div className="predictions">
          {/* These are containers for age, gender, emotion results, still left them, maybe they can be used in future */}
          {/* <div className="age-container"> */}
          {/* <div className="age-float shadow-xl"> */}
          {/* <AgeIcon gender={gender} age={age} />
              <span className="description">
                <span className="description-for">Age:</span>
                <span className="age">{getAgeGroup(age)}</span>
              </span> */}
          {/* </div> */}
          {/* </div> */}
          {/* <div className="gender-container"> */}
          {/* <div className="gender-float shadow-xl"> */}
          {/* <GenderIcon gender={gender} />
              <span className="description">
                <span className="description-for">Gender:</span>
                <span className="gender">{capitalize(gender)}</span>
              </span> */}
          {/* </div> */}
          {/* </div> */}
          {/* <span className="emotion">
          Dominant Emotion: {getDominantEmotion(emotions)}
        </span> */}
          <div className="emotion-container">
            {/* <EmotionIcon emotion={getDominantEmotion(emotions)} /> */}
            {/* <div className="emotion-float"> */}
            {EmotionGif(getDominantEmotion(emotions))}
            <span className="description">
              <span className="description-for">Emotion:</span>
              <span className="gender">
                {capitalize(getDominantEmotion(emotions))}
              </span>
            </span>
            {/* </div> */}
          </div>
        </div>
      </div>
      <div className="retry-div">
        <span>Think we got it wrong?</span>
        <div className="retry-button" onClick={retryButtonHandler}>
          <span>Retry</span>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
//TODO: Add retry button in the analysisresult screen that should take the user back to the start of the flow
