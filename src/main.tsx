import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AnalysisResults from "./components/AnalysisResults";
import Recommendations from "./components/Recommendations";
import "./index.css";
import { GlobalContextProvider } from "./GlobalContext";
import { Home, Beverages, Cart, Payment } from './components/pages';
import VideoComponent from "./components/VideoComponent";
import SettingsScreen from "./components/SettingsScreen";

/**
 * React Router v6, passing props: https://ui.dev/react-router-pass-props-to-components
 * Inorder to pass props from VideoComponent to AnalysisResults component:
 *  1) AnalysisResults component should be child of VideoComponent
 *  2) Use some kind of context
 *  3) Move the state(age, gender, emotion) to App component, AnalysisResults component should be a child of App component
 */

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
        <Routes>
          {/* <Route path="/" element={<Home />}/> */}
          {/* <Route path="/beverages" element={<Beverages />}/> */}
          {/* <Route path="/cart" element={<Cart />}/> */}
          {/* <Route path="/payment" element={<Payment />}/> */}
          {/* <Route path="/app" element={<App />}/> */}
          {<Route path="/" element={<App />} />}
          <Route path="/detectionScreen" element={<VideoComponent />} />
          <Route path="/analysisResults" element={<AnalysisResults />}/>
          <Route path="/recommendations" element={<Recommendations />}/>
          <Route path="/settings" element={<SettingsScreen />} />
        </Routes>
      </GlobalContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
