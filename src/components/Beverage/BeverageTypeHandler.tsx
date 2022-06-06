import { Button } from "../Animated";
import { Up, Down} from "../../assets/icons";

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
    <div className="flex flex-col">
      <span className=""><Up /></span>
      <>
        {types.map((type) => {
          return <Button
            onClick={() => {setType(type)}}
            overrideDefaultStyles={true}
            classes="w-20 h-20"
            scaleOnHover={1.025}
            scaleOnTap={0.9}
          >
            {/* <img src={type.imgSrc} alt={type.imgAlt ? type.imgAlt : ""}></img> */}
            {type}
          </Button>
        })}
      </>
      <span className=""><Down /></span>
    </div>
  );
};

export default BeverageTypeHandler;