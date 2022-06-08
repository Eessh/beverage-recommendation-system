import { Button } from "../Animated";
import { Up, Down } from "../../assets/icons";
import "./BeverageTypeHandler.css";

// interface IType {
//   typeName: string,
//   // imgSrc: string,
//   // imgAlt?: string
// };

interface IProps {
  setType: React.Dispatch<React.SetStateAction<string>>,
  types: string[]
};

const BeverageTypeHandler: React.FC<IProps> = ({setType, types}) => {

  return(
    <div className="BeverageTypeHandler h-3/4 flex flex-col relative px-2 py-1 items-center bg-slate-100 rounded-xl">
      {/* <span className="h-fit flex flex-row justify-center items-center mb-2"><Up /></span> */}
      <div className="flex-1 flex min-h-0">
        <div className="BeverageTypesWrapper flex-1 overflow-auto">
          <div className="BeverageTypes flex flex-col overflow-y-auto overflow-x-hidden">
            {types.map((type, index) => {
              return <Button
                key={index}
                onClick={() => {setType(type)}}
                overrideDefaultStyles={true}
                classes="my-1 w-36 h-36 bg-slate-200 rounded-xl text-xl"
              >
                {/* <img src={type.imgSrc} alt={type.imgAlt ? type.imgAlt : ""}></img> */}
                {type}
              </Button>
            })}
          </div>
        </div>
      </div>
      {/* <span className="h-fit flex flex-row justify-center items-center mt-2"><Down /></span> */}
    </div>
  );
};

export default BeverageTypeHandler;