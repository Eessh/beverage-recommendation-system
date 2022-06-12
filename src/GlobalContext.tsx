import React, { createContext, useContext, useState } from "react";
import { CocaCola } from "./assets/images";

export interface IBeverage {
  title: string,
  description: string,
  imgSrc: string,
  imgAlt?: string,
  price: number,
  quantityAvailable: number
};

export type TEmotions = {
  happy: number,
  sad: number,
  neutral: number,
  angry: number,
  surprised: number,
  fearful: number,
  disgusted: number
};

// As recommendations can depend on various parameters
export type TRecommendations = {
  ageGender: string[],
  emotions: string[],
  weather: string[],
  temperature: string[],
  season: string[]
};

type TGlobalContext = {
  age: number,
  gender: string,
  emotions: TEmotions,
  recommendations: TRecommendations,
  activeBeverageType: string,
  activeBeverage: IBeverage,
  moreInfoVisible: boolean,
  setAge: React.Dispatch<React.SetStateAction<number>>,
  setGender: React.Dispatch<React.SetStateAction<string>>,
  setEmotions: React.Dispatch<React.SetStateAction<TEmotions>>,
  setRecommendations: React.Dispatch<React.SetStateAction<TRecommendations>>,
  setActiveBeverageType: React.Dispatch<React.SetStateAction<string>>,
  setActiveBeverage: React.Dispatch<React.SetStateAction<IBeverage>>,
  setMoreInfoVisible: React.Dispatch<React.SetStateAction<boolean>>
};

type TGlobalContextProviderProps = {
  children: React.ReactNode | React.ReactNode[]
};

const defaultContextValue: TGlobalContext = {
  age: 24,
  gender: "male",
  emotions: {
    happy: 100,
    sad: 0,
    neutral: 0,
    angry: 0,
    surprised: 0,
    fearful: 0,
    disgusted: 0
  },
  recommendations: {
    ageGender: [],
    emotions: [],
    weather: [],
    temperature: [],
    season: []
  },
  activeBeverageType: "Carbonated Drinks",
  activeBeverage: {
    title: "Coca Cola",
    description: "",
    imgSrc: CocaCola,
    imgAlt: "",
    price: 1.35,
    quantityAvailable: 21
  },
  moreInfoVisible: false,
  setAge: () => {},
  setGender: () => {},
  setEmotions: () => {},
  setRecommendations: () => {},
  setActiveBeverageType: () => {},
  setActiveBeverage: () => {},
  setMoreInfoVisible: () => {}
}

const GlobalContext = createContext<TGlobalContext>(defaultContextValue);

const GlobalContextProvider: React.FC<TGlobalContextProviderProps> = ({children}) => {
  const [age, setAge] = useState<number>(defaultContextValue.age);
  const [gender, setGender] = useState<string>(defaultContextValue.gender);
  const [emotions, setEmotions] = useState<TEmotions>(defaultContextValue.emotions);
  const [recommendations, setRecommendations] = useState<TRecommendations>(defaultContextValue.recommendations);
  const [activeBeverageType, setActiveBeverageType] = useState<string>(defaultContextValue.activeBeverageType);
  const [activeBeverage, setActiveBeverage] = useState<IBeverage>(defaultContextValue.activeBeverage);
  const [moreInfoVisible, setMoreInfoVisible] = useState<boolean>(defaultContextValue.moreInfoVisible);
  
  return(
    <GlobalContext.Provider value={{
      age, setAge,
      gender, setGender,
      emotions, setEmotions,
      recommendations, setRecommendations,
      activeBeverageType, setActiveBeverageType,
      activeBeverage, setActiveBeverage,
      moreInfoVisible, setMoreInfoVisible
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
