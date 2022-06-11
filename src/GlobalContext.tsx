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

type TEmotions = {
  happy: number,
  sad: number,
  neutral: number,
  angry: number,
  surprised: number,
  fearful: number,
  disgusted: number
};
type TGlobalContext = {
  age: number,
  gender: string,
  emotions: TEmotions,
  activeBeverageType: string,
  activeBeverage: IBeverage,
  moreInfoVisible: boolean,
  setAge: React.Dispatch<React.SetStateAction<number>>,
  setGender: React.Dispatch<React.SetStateAction<string>>,
  setEmotions: React.Dispatch<React.SetStateAction<TEmotions>>,
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
    happy: 1.00,
    sad: 0.00,
    neutral: 0.00,
    angry: 0.00,
    surprised: 0.00,
    fearful: 0.0,
    disgusted: 0.00
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
  setActiveBeverageType: () => {},
  setActiveBeverage: () => {},
  setMoreInfoVisible: () => {}
}

const GlobalContext = createContext<TGlobalContext>(defaultContextValue);

const GlobalContextProvider: React.FC<TGlobalContextProviderProps> = ({children}) => {
  const [age, setAge] = useState<number>(defaultContextValue.age);
  const [gender, setGender] = useState<string>(defaultContextValue.gender);
  const [emotions, setEmotions] = useState<TEmotions>(defaultContextValue.emotions);
  const [activeBeverageType, setActiveBeverageType] = useState<string>(defaultContextValue.activeBeverageType);
  const [activeBeverage, setActiveBeverage] = useState<IBeverage>(defaultContextValue.activeBeverage);
  const [moreInfoVisible, setMoreInfoVisible] = useState<boolean>(defaultContextValue.moreInfoVisible);
  
  return(
    <GlobalContext.Provider value={{
      age, setAge,
      gender, setGender,
      emotions, setEmotions,
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