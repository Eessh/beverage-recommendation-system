import React, { createContext, SetStateAction, useContext, useState } from "react";
import { CocaCola } from "./assets/images";
import { TBeverage, TRecommendations, TEmotions, TTag, TBeverages } from "./Types";

type TGlobalContext = {
  modelsLoaded: boolean,
  age: number,
  gender: string,
  emotions: TEmotions,
  weatherCode: number,
  temperature: number,
  recommendations: TRecommendations,
  cart: TBeverages,
  recommendationsPromptVisible: boolean,
  visitedRecommendationsPage: boolean,
  activeBeverageTag: string,
  activeBeverage: TBeverage,
  moreInfoVisible: boolean,
  timeoutId: number,
  setModelsLoaded: React.Dispatch<React.SetStateAction<boolean>>,
  setAge: React.Dispatch<React.SetStateAction<number>>,
  setGender: React.Dispatch<React.SetStateAction<string>>,
  setEmotions: React.Dispatch<React.SetStateAction<TEmotions>>,
  setWeatherCode: React.Dispatch<React.SetStateAction<number>>
  setTemperature: React.Dispatch<React.SetStateAction<number>>
  setRecommendations: React.Dispatch<React.SetStateAction<TRecommendations>>,
  setCart: React.Dispatch<React.SetStateAction<TBeverages>>,
  setRecommendationsPromptVisible: React.Dispatch<SetStateAction<boolean>>,
  setVisitedRecommendationsPage: React.Dispatch<React.SetStateAction<boolean>>,
  setActiveBeverageTag: React.Dispatch<React.SetStateAction<string>>,
  setActiveBeverage: React.Dispatch<React.SetStateAction<TBeverage>>,
  setMoreInfoVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setTimeoutId: React.Dispatch<React.SetStateAction<number>>
};

type TGlobalContextProviderProps = {
  children: React.ReactNode | React.ReactNode[]
};

const defaultContextValue: TGlobalContext = {
  modelsLoaded: false,
  age: 24,
  gender: "male",
  emotions: {
    happy: 0,
    sad: 0,
    neutral: 0,
    angry: 0,
    surprised: 0,
    fearful: 0,
    disgusted: 0
  },
  weatherCode: 0,
  temperature: 25,
  recommendations: {
    ageGender: [],
    emotions: [],
    weather: [],
    temperature: [],
    season: []
  },
  cart: [],
  recommendationsPromptVisible: false,
  visitedRecommendationsPage: false,
  activeBeverageTag: "Carbonated Drinks",
  activeBeverage: {
    name: "Coca Cola",
    description: "",
    price: 1.35,
    quantityAvailable: 21,
    tags: [],
    imgSrc: CocaCola,
    imgAlt: "",
  },
  moreInfoVisible: false,
  timeoutId: 0,
  setModelsLoaded: () => {},
  setAge: () => {},
  setGender: () => {},
  setEmotions: () => {},
  setWeatherCode: () => {},
  setTemperature: () => {},
  setRecommendations: () => {},
  setCart: () => {},
  setRecommendationsPromptVisible: () => {},
  setVisitedRecommendationsPage: () => {},
  setActiveBeverageTag: () => {},
  setActiveBeverage: () => {},
  setMoreInfoVisible: () => {},
  setTimeoutId: () => {}
}

const GlobalContext = createContext<TGlobalContext>(defaultContextValue);

const GlobalContextProvider: React.FC<TGlobalContextProviderProps> = ({children}) => {
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(defaultContextValue.modelsLoaded);
  const [age, setAge] = useState<number>(defaultContextValue.age);
  const [gender, setGender] = useState<string>(defaultContextValue.gender);
  const [emotions, setEmotions] = useState<TEmotions>(defaultContextValue.emotions);
  const [weatherCode, setWeatherCode] = useState<number>(defaultContextValue.weatherCode);
  const [temperature, setTemperature] = useState<number>(defaultContextValue.temperature);
  const [recommendations, setRecommendations] = useState<TRecommendations>(defaultContextValue.recommendations);
  const [cart, setCart] = useState<TBeverages>(defaultContextValue.cart);
  const [recommendationsPromptVisible, setRecommendationsPromptVisible] = useState<boolean>(defaultContextValue.recommendationsPromptVisible);
  const [visitedRecommendationsPage, setVisitedRecommendationsPage] = useState<boolean>(defaultContextValue.visitedRecommendationsPage);
  const [activeBeverageTag, setActiveBeverageTag] = useState<TTag>(defaultContextValue.activeBeverageTag);
  const [activeBeverage, setActiveBeverage] = useState<TBeverage>(defaultContextValue.activeBeverage);
  const [moreInfoVisible, setMoreInfoVisible] = useState<boolean>(defaultContextValue.moreInfoVisible);
  const [timeoutId, setTimeoutId] = useState<number>(defaultContextValue.timeoutId);
  
  return(
    <GlobalContext.Provider value={{
      modelsLoaded, setModelsLoaded,
      age, setAge,
      gender, setGender,
      emotions, setEmotions,
      weatherCode, setWeatherCode,
      temperature, setTemperature,
      recommendations, setRecommendations,
      cart, setCart,
      recommendationsPromptVisible, setRecommendationsPromptVisible,
      visitedRecommendationsPage, setVisitedRecommendationsPage,
      activeBeverageTag, setActiveBeverageTag,
      activeBeverage, setActiveBeverage,
      moreInfoVisible, setMoreInfoVisible,
      timeoutId, setTimeoutId
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = (): TGlobalContext => {
  const context = useContext(GlobalContext);
  if (context===null || context===undefined) {
    throw new Error("Error: useGlobalContext() can only be used inside of GlobalContextProvider.")
  }
  return context;
};

export {
  GlobalContextProvider,
  useGlobalContext
};
