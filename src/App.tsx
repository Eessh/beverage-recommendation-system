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

function App() {
  const { age, gender, setModelsLoaded, setRecommendations } = useGlobalContext();
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
        setModelsLoaded(true);
      })
      .catch((err) => console.log("Error while loading Models: ", err));
  };

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
