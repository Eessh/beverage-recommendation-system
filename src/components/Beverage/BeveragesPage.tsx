import { useState } from "react";
import { BeverageTypeHandler, BeveragesView } from ".";
import { BeverageTypes, getBeveragesOfType } from "./data";

const BeveragesPage = () => {
  const [type, setType] = useState<string>("Carbonated Drinks");

  return(
    <div className="flex flex-row relative">
      <BeverageTypeHandler types={BeverageTypes} setType={setType} />
      <BeveragesView beverages={getBeveragesOfType(type)} />
    </div>
  );
};

export default BeveragesPage;