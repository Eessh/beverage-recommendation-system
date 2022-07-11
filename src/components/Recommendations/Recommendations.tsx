import { useGlobalContext } from "../../GlobalContext";
import "./Recommendations.css";
import {useEffect, useState} from "react";
import {TTags} from "../../Types";
import { BeveragesPage } from "../pages";
import { AnimatePresence } from "framer-motion";
import { Modal } from "../Animated";
import ViewMorePopup from "../ViewMorePopup";

const Recommendations = () => {
  const {
    recommendations,
    moreInfoVisible,
    setMoreInfoVisible,
    setActiveBeverageTag,
    setVisitedRecommendationsPage
  } = useGlobalContext();
  const [tagsToShow, setTagsToShow] = useState<TTags>([]);

  useEffect(() => {
    setVisitedRecommendationsPage(true);
    // Object.values(recommendations).forEach((parameter) => {
    //   parameter.forEach((tag) => {
    //     if (tagsToShow.find(beverageTag => beverageTag===tag)===undefined) {
    //       // tagsToShow.push(tag);
    //       setTagsToShow((prevTags) => [...prevTags, tag]);
    //     }
    //   });
    // });
    setTagsToShow((tags) => {
      // const noDupsTags = [... new Set(tags)];
      // setActiveBeverageTag(noDupsTags[0]);
      // return noDupsTags;
      setActiveBeverageTag(recommendations.emotions[0]);
      return recommendations.emotions;
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