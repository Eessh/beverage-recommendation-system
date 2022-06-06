import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ViewMorePopup } from ".";
import { Button, Modal } from "../Animated";

interface IProps {
  title: string,
  description: string,
  imgSrc: string,
  imgAlt?: string,
  price: number,
  quantityAvailable: number
}

const BeverageCard: React.FC<IProps> = ({title, description, imgSrc, imgAlt, price, quantityAvailable}) => {
  const [moreInfoVisible, setMoreInfoVisible] = useState<boolean>(false);

  return(
    <Button
      overrideDefaultStyles={true}
      classes="flex flex-col p-4 rounded-xl"
      scaleOnHover={1.025}
      scaleOnTap={0.9}
    >
      <img
        className="rounded-xl"
        src={imgSrc}
        alt={imgAlt ? imgAlt : ""}
      />
      <p className="">{title}</p>
      <div className="flex flex-row">
        <span className="">${price}</span>
        <Button>View more</Button>
      </div>
      <AnimatePresence
        // Disable any initial animations on children that
        // are present when the component is first rendered
        initial={false}
        // Only render one component at a time.
        // The exiting component will finish its exit
        // animation before entering component is rendered
        exitBeforeEnter={true}
        // Fires when all exiting nodes have completed animating out
        onExitComplete={() => null}
      >
        {
          moreInfoVisible && <Modal close={() => setMoreInfoVisible(false)}>
            <ViewMorePopup
              title={title}
              description={description}
              imgSrc={imgSrc}
              imgAlt={imgAlt}
              price={price}
              quantityAvailable={quantityAvailable}
            />
          </Modal>
        }
      </AnimatePresence>
    </Button>
  );
};

export default BeverageCard;