import { useGlobalContext } from "../../GlobalContext";
import "./Recommendations.css";
import {useEffect, useState} from "react";
import {TTags} from "../../Types";
import BeveragesPage from "../BeveragesPage";
import { AnimatePresence } from "framer-motion";
import { Modal } from "../Animated";
import ViewMorePopup from "../ViewMorePopup/ViewMorePopup";

const Recommendations = () => {
  const { recommendations, moreInfoVisible, setMoreInfoVisible, setActiveBeverageTag } = useGlobalContext();
  const [tagsToShow, setTagsToShow] = useState<TTags>([]);

  useEffect(() => {
    Object.values(recommendations).forEach((parameter) => {
      parameter.forEach((tag) => {
        if (tagsToShow.find(beverageTag => beverageTag===tag)===undefined) {
          // tagsToShow.push(tag);
          setTagsToShow((prevTags) => [...prevTags, tag]);
        }
      });
    });
    setTagsToShow((tags) => {
      const noDupsTags = [... new Set(tags)];
      setActiveBeverageTag(noDupsTags[0]);
      return noDupsTags;
    });
  }, []);
  
  return(
    <div className={"Recommendations"}>
      <BeveragesPage useRecommendedTags={true} recommendedTags={tagsToShow} />
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {
          moreInfoVisible && <Modal close={() => setMoreInfoVisible(false)}>
            <ViewMorePopup />
          </Modal>
        }
      </AnimatePresence>
    </div>
  );
};

export default Recommendations;