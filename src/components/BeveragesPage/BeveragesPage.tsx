import BeverageTagHandler from "../BeverageTagHandler";
import BeverageViewHandler from "../BeverageViewHandler";
import { TTags } from "../../Types";
import { Tags } from "../../TaggingSystem";

type TBeveragesPageProps = {
	useRecommendedTags: boolean,
	recommendedTags: TTags
};

const BeveragesPage: React.FC<TBeveragesPageProps> = ({useRecommendedTags=false, recommendedTags=[]}) => {
	return (
		<div className="BeveragesPage w-full flex-1 flex flex-row relative">
			<div className="BeverageTypeHandlerWrapper w-fit max-h-full flex flex-col justify-center items-center p-4">
				<BeverageTagHandler
					tags={recommendedTags}
				/>
			</div>
			<div className="BeveragesViewWrapper flex-1 h-full p-4">
				<BeverageViewHandler />
			</div>
		</div>
	);
};

export default BeveragesPage;