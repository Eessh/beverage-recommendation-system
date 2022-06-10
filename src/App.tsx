import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import * as faceapi from "face-api.js";
import { AnimatePresence } from 'framer-motion';
import { Modal } from './components/Animated';
import VideoComponent from './components/VideoComponent';
import { BeveragesPage } from './components/Beverage';
import { useGlobalContext } from './GlobalContext';
import { ViewMorePopup } from './components/Beverage';

function App() {
  const {
    activeBeverage,
    moreInfoVisible, setMoreInfoVisible
  } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    loadModels();

    // redirecting to next page after 7 seconds
    setTimeout(() => navigate("/analysisResults"), 7000);
  }, []);

  const loadModels = () => {
    const modelsURI: string = "/models";
    Promise.all([
      faceapi.loadTinyFaceDetectorModel(modelsURI),
      faceapi.loadAgeGenderModel(modelsURI),
      faceapi.loadFaceLandmarkModel(modelsURI),
      faceapi.loadFaceExpressionModel(modelsURI)
    ])
    .then(() => {
      console.log("Log: Models loaded");
    })
    .catch((err) => console.log("Error while loading Models: ", err));
  };

  return (
    <div className="App min-w-screen min-h-screen flex flex-col">
      <VideoComponent />
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
