import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as faceapi from "face-api.js";
import { AnimatePresence } from "framer-motion";
import { Modal } from "./components/Animated";
import VideoComponent, { IBeveragePercent } from "./components/VideoComponent";
import AnalysisResults from "./components/AnalysisResults";
import { BeveragesPage } from "./components/Beverage";
import { useGlobalContext } from "./GlobalContext";
import { ViewMorePopup } from "./components/Beverage";
import {
  AgeRanges,
  BeverageTypes,
  FemaleBeveragesData,
  MaleBeveragesData,
} from "./components/VideoComponent/data";

function App() {
  const { age, gender, setRecommendations } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    loadModels();

    // redirecting to next page after 7 seconds
    setTimeout(() => {
      // setRecommendations(getRecommendations(gender, age));
      navigate("/analysisResults");
    }, 10000);
  }, []);

  const loadModels = () => {
    const modelsURI: string = "/models";
    Promise.all([
      faceapi.loadTinyFaceDetectorModel(modelsURI),
      faceapi.loadAgeGenderModel(modelsURI),
      faceapi.loadFaceLandmarkModel(modelsURI),
      faceapi.loadFaceExpressionModel(modelsURI),
    ])
      .then(() => {
        console.log("Log: Models loaded");
      })
      .catch((err) => console.log("Error while loading Models: ", err));
  };

  // const getAgeIndex = (age: number): number => {
  // let ans = 0;
  // for (let i = 0; i < AgeRanges.length; i++) {
  // if (AgeRanges[i].lower <= age && age <= AgeRanges[i].upper) {
  // ans = i;
  // break;
  // }
  // }
  // return ans;
  // };

  // const getRecommendations = (
  // gender: string | undefined,
  // age: number | undefined
  // ): Array<string> => {
  // if (gender === undefined || age === undefined) return [];
  // const recommendations = new Array<string>();
  // const dataIndex = getAgeIndex(age);
  // const data: IBeveragePercent[] =
  // gender === "male"
  // ? MaleBeveragesData[dataIndex].map((value, index) => {
  // return { type: BeverageTypes[index], percent: value };
  // })
  // : FemaleBeveragesData[dataIndex].map((value, index) => {
  // return { type: BeverageTypes[index], percent: value };
  // });
  // data.sort((a, b) => {
  // return a.percent - b.percent;
  // });
  // data.forEach((value) => recommendations.push(value.type));
  // console.log("Log: Returning: ", data);
  // return recommendations;
  // };

  return (
    <div className="App flex-1 flex flex-col">
      <VideoComponent />
      {/* <AnalysisResults /> */}
      {/* <BeveragesPage /> */}
      {/* <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {
          moreInfoVisible && <Modal close={() => setMoreInfoVisible(false)}>
            <ViewMorePopup
              title={activeBeverage.title}
              description={activeBeverage.description}
              imgSrc={activeBeverage.imgSrc}
              imgAlt={activeBeverage.imgAlt}
              price={activeBeverage.price}
              quantityAvailable={activeBeverage.quantityAvailable}
              setMoreInfoVisible={setMoreInfoVisible}
            />
          </Modal>
        }
      </AnimatePresence> */}
      {/* <header className="App-header"></header> */}
    </div>
  );
}

export default App;
