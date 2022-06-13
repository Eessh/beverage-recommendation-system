import { useGlobalContext } from "../../GlobalContext";
import "./Recommendations.css";
import {useEffect, useState} from "react";
import {TTags} from "../../Types";
import BeveragesPage from "../BeveragesPage";

const Recommendations = () => {
  const { recommendations } = useGlobalContext();
  // let tagsToShow: TTag[] = [];
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
      return [... new Set(tags)];
    })
    console.log("Log: Tags to show: ", tagsToShow);
  }, []);
  
  return(
    <BeveragesPage useRecommendedTags={true} recommendedTags={tagsToShow} />
  );
};

export default Recommendations;