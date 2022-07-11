import { useEffect } from "react";
import * as faceapi from "face-api.js";
import { useGlobalContext } from "./GlobalContext";
import LaunchScreen from "./components/LaunchScreen";

function App() {
  const { setModelsLoaded } = useGlobalContext();

  useEffect(() => {
    loadModels();
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
      <LaunchScreen />
    </div>
  );
}

export default App;
