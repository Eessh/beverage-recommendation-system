import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from './App';
import AnalysisResults from './components/AnalysisResults';
import Recommendations from './components/Recommendations';
import './index.css'
import { GlobalContextProvider } from "./GlobalContext";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
        <Routes>
          <Route path="/" element={<App />}/>
          <Route path="/analysisResults" element={<AnalysisResults />}/>
          <Route path="/recommendations" element={<Recommendations />}/>
        </Routes>
      </GlobalContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
