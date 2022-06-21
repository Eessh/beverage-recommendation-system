import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../GlobalContext";
import "./VideoComponent.css";
import * as faceapi from "face-api.js";
import TextTransition, { presets } from "react-text-transition";
import ClipLoader from "react-spinners/ClipLoader";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import {
  IAgeRange,
  IBeveragePercent,
  TBeveragesTypes,
  TAgeRanges,
  TBeveragesData,
} from ".";
import {
  BeverageTypes,
  AgeRanges,
  MaleBeveragesData,
  FemaleBeveragesData,
} from "./data";
import { TEmotions } from "../../Types";
import { number } from "prop-types";

const VideoComponent = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // const [age, setAge] = useState<number | undefined>(18);
  // const [gender, setGender] = useState<string | undefined>("male");
  const { modelsLoaded, age, setAge, gender, setGender, setEmotions } =
    useGlobalContext();
  const [textIndex, setTextIndex] = useState<number>(0);
  let [spinnerActive, setSpinnerActive] = useState<boolean>(true);
  const [numberOfDetection, setNumberOfDetections] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("modelsLoaded value - ", modelsLoaded);
    getVideoStream();
    setTimeout(() => {
      // setRecommendations(getRecommendations(gender, age));
      navigate("/analysisResults");
    }, 10000);
    const interval = setInterval(() => {
      modelsLoaded && detectParams();
      setNumberOfDetections((prev) => prev + 1);
    }, 800);
    const textInterval = setInterval(
      () => setTextIndex((index) => index + 1),
      3000 // every 3 seconds
    );

    return () => {
      clearInterval(textInterval);
      clearInterval(interval);
    };
  }, [modelsLoaded]);

  const getVideoStream = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((videoStream) => {
        videoRef.current!.srcObject = videoStream;
        console.log("Log: VideoStream loaded");
      })
      .catch((err) => console.log("Error while accessing VideoStream: ", err));
  };

  const addEmotions = (
    prevEmotions: TEmotions,
    currentEmotions: TEmotions
  ): TEmotions => {
    return {
      happy: prevEmotions.happy + currentEmotions.happy,
      sad: prevEmotions.sad + currentEmotions.sad,
      neutral: prevEmotions.neutral + currentEmotions.neutral,
      angry: prevEmotions.angry + currentEmotions.angry,
      fearful: prevEmotions.fearful + currentEmotions.fearful,
      disgusted: prevEmotions.disgusted + currentEmotions.disgusted,
      surprised: prevEmotions.surprised + currentEmotions.surprised,
    };
  };

  const detectParams = async () => {
    const params = await faceapi
      .detectSingleFace(
        videoRef.current!,
        new faceapi.TinyFaceDetectorOptions({ inputSize: 320 })
      )
      .withFaceLandmarks()
      .withFaceExpressions();
    if (params !== undefined) {
      // setAge((prev: number) => {
      //   // console.log("Log: Age: ", prev);
      //   return params.age;
      // });
      // setGender((prevGender: string) => {
      //   // console.log("Log: Gender: ", prevGender);
      //   return params?.gender;
      // });
      setEmotions((prevEmotions) => {
        return addEmotions(prevEmotions, params.expressions);
      });
    }
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

  const getRecommendations = (
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

  const infoTexts: string[] = [
    "Analysing Emotions",
    "Predicting Gender",
    "Estimating Age",
  ];

  return (
    <div className="analysing-screen-root-div">
      <video
        ref={videoRef}
        className="video-component"
        autoPlay
        muted
        playsInline
      ></video>
      <div className=" video-info-container">
        <RingLoader color="#ffd65c" loading={spinnerActive} size={180} />
        <h1 className="info-text">
          {/* <TextTransition
            text={infoTexts[textIndex % infoTexts.length]}
            springConfig={presets.molasses}
          /> */}
          {numberOfDetection < 2
            ? "Initializing ..."
            : numberOfDetection < 5
            ? "Detecting Emotions"
            : "Improving Accuracy"}
        </h1>
      </div>
    </div>
  );
};

export default VideoComponent;
