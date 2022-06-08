import { useState } from "react";
import { BeverageTypeHandler, BeveragesView } from ".";
import { BeverageTypes, getBeveragesOfType } from "./data";

const BeveragesPage = () => {
  const [type, setType] = useState<string>("Carbonated Drinks");

  return(
    <div className="BeveragesPage w-full flex-1 flex flex-row relative">
      <div className="BeverageTypeHandlerWrapper w-fit min-h-full flex flex-col justify-center items-center p-4">
        <BeverageTypeHandler types={BeverageTypes} setType={setType} />
      </div>
      <div className="BeveragesViewWrapper flex-1 h-full p-4">
        <BeveragesView beverages={getBeveragesOfType(type)} />
      </div>
    </div>
  );
};

export default BeveragesPage;