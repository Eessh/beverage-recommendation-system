import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../GlobalContext";
import "./VideoComponent.css";
import * as faceapi from "face-api.js";
import TextTransition, { presets } from "react-text-transition";
import ClipLoader from "react-spinners/ClipLoader";
import { RingLoader } from "react-spinners";
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

const VideoComponent = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // const [age, setAge] = useState<number | undefined>(18);
  // const [gender, setGender] = useState<string | undefined>("male");
  const { age, setAge, gender, setGender, setEmotions } = useGlobalContext();
  const [textIndex, setTextIndex] = useState<number>(0);
  let [spinnerActive, setSpinnerActive] = useState<boolean>(true);

  useEffect(() => {
    getVideoStream();
    const interval = setInterval(() => {
      detectParams();
      // console.log("Log: Recommendations: ", getRecommendations(gender, age));
    }, 200);
    const textInterval = setInterval(
      () => setTextIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => {
      clearInterval(textInterval);
      clearInterval(interval);
    };
  }, []);

  const getVideoStream = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((videoStream) => {
        videoRef.current!.srcObject = videoStream;
        console.log("Log: VideoStream loaded");
      })
      .catch((err) => console.log("Error while accessing VideoStream: ", err));
  };

  const detectParams = async () => {
    const params = await faceapi
      .detectSingleFace(
        videoRef.current!,
        new faceapi.TinyFaceDetectorOptions({ inputSize: 320 })
      )
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();
    if (params !== undefined) {
      setAge((prev: number) => {
        console.log("Log: Age: ", prev);
        // if (prev !== undefined && params?.age !== undefined)
        // return Math.min(params?.age, prev);
        return params.age;
        // else return prev;
      });
      setGender((prevGender: string) => {
        console.log("Log: Gender: ", prevGender);
        // if (prevGender!==undefined && params?.gender!==undefined)
        return params?.gender;
        // else return prevGender;
      });
      setEmotions((prevEmotions) => {
        console.log("Log: Emotions: ", prevEmotions);
        // Object.assign(prevEmotions, params.expressions);
        // Object.values(prevEmotions).map((emotionValue) => Math.round(emotionValue));
        return {
          happy: params.expressions.happy * 100,
          sad: params.expressions.sad * 100,
          neutral: params.expressions.neutral * 100,
          angry: params.expressions.angry * 100,
          surprised: params.expressions.surprised * 100,
          fearful: params.expressions.fearful * 100,
          disgusted: params.expressions.disgusted * 100,
        };
        // return params.expressions.map((emotion) => {return emotion*100});
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
          <TextTransition
            text={infoTexts[textIndex % infoTexts.length]}
            springConfig={presets.molasses}
          />
        </h1>
      </div>
    </div>
  );
};

export default VideoComponent;
