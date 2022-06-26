import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../GlobalContext";
import BeverageTagHandler from "../../BeverageTagHandler";
import BeverageViewHandler from "../../BeverageViewHandler";
import { TTags } from "../../../Types";
import { Tags } from "../../../TaggingSystem";
import { AnimatePresence } from "framer-motion";
import { Button, Modal } from "../../Animated";
import ViewMorePopup from "../../ViewMorePopup/ViewMorePopup";
import "./Beverages.css";
import { Cart } from "../../../assets/icons";

type TBeveragesPageProps = {
	useRecommendedTags?: boolean,
	recommendedTags?: TTags
};

const BeveragesPage: React.FC<TBeveragesPageProps> = ({useRecommendedTags=false, recommendedTags=[]}) => {
	
	const navigate = useNavigate();
	const {
		moreInfoVisible,
		setMoreInfoVisible
	} = useGlobalContext();

	return (
		<div className="BeveragesPage w-full flex-1 flex flex-row relative">
			<div className="BeverageTypeHandlerWrapper w-fit max-h-full flex flex-col justify-center items-center p-4">
				<BeverageTagHandler
					tags={useRecommendedTags ? recommendedTags : Tags}
				/>
			</div>
			<div className="BeveragesViewWrapper flex-1 h-full p-4">
				<BeverageViewHandler />
			</div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {
          moreInfoVisible && <Modal close={() => setMoreInfoVisible(false)}>
            <ViewMorePopup/>
          </Modal>
        }
      </AnimatePresence>
			<Button
				onClick={() => {navigate("/cart")}}
				overrideDefaultStyles={true}
				classes="cart-btn rounded-xl shadow-2xl"
			>
				<span className="cart-icon"><Cart /></span>
				<span>Cart</span>
			</Button>
		</div>
	);
};

export default BeveragesPage;