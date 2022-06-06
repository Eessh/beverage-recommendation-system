import { BeverageCard } from ".";

interface IBeverage {
  title: string,
  description: string,
  imgSrc: string,
  imgAlt?: string,
  price: number,
  quantityAvailable: number
};

interface IProps {
  beverages: IBeverage[]
};

const BeveragesView: React.FC<IProps> = ({beverages}) => {
  return(
    <div className="flex flex-row flex-wrap">
      <>
        {beverages.map((beverage) => {
          return <BeverageCard
            title={beverage.title}
            description={beverage.description}
            imgSrc={beverage.imgSrc}
            imgAlt={beverage.imgAlt}
            price={beverage.price}
            quantityAvailable={beverage.quantityAvailable}
          />
        })}
      </>
    </div>
  );
};

export default BeveragesView;