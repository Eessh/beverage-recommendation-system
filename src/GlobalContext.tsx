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

interface IGlobalContext {
  activeBeverageType: string,
  activeBeverage: IBeverage,
  moreInfoVisible: boolean,
  setActiveBeverageType: React.Dispatch<React.SetStateAction<string>>,
  setActiveBeverage: React.Dispatch<React.SetStateAction<IBeverage>>,
  setMoreInfoVisible: React.Dispatch<React.SetStateAction<boolean>>
};
interface IGlobalContextProviderProps {
  children: React.ReactNode | React.ReactNode[]
};

const defaultContextValue: IGlobalContext = {
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
  setActiveBeverageType: () => {},
  setActiveBeverage: () => {},
  setMoreInfoVisible: () => {}
}

const GlobalContext = createContext<IGlobalContext>(defaultContextValue);

const GlobalContextProvider: React.FC<IGlobalContextProviderProps> = ({children}) => {
  const [activeBeverageType, setActiveBeverageType] = useState<string>(defaultContextValue.activeBeverageType);
  const [activeBeverage, setActiveBeverage] = useState<IBeverage>(defaultContextValue.activeBeverage);
  const [moreInfoVisible, setMoreInfoVisible] = useState<boolean>(defaultContextValue.moreInfoVisible);
  
  return(
    <GlobalContext.Provider value={{
      activeBeverageType, setActiveBeverageType,
      activeBeverage, setActiveBeverage,
      moreInfoVisible, setMoreInfoVisible
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = (): IGlobalContext => {
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