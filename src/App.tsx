import { useEffect, useState } from 'react';
import * as faceapi from "face-api.js";
import VideoComponent from './components/VideoComponent';
import { Button } from './components/Animated';
import { BeveragesPage } from './components/Beverage';
// import './App.css'

function App() {
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);

  useEffect(() => {
    loadModels();
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
      setModelsLoaded(true);
      console.log("Log: Models loaded");
    })
    .catch((err) => console.log("Error while loading Models: ", err));
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <VideoComponent /> */}
        {/* <Button>Hola</Button> */}
        <BeveragesPage />
      </header>
    </div>
  );
}

export default App
