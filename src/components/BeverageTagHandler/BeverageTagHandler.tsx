import { useGlobalContext } from "../../GlobalContext";
import { TTag } from "../../Types";
import { Button } from "../Animated";
import "./BeverageTagHandler.css";
import {useEffect, useState} from "react";

export type TTagHandlerProps = {
	tags: TTag[]
};

const BeverageTagHandler: React.FC<TTagHandlerProps> = ({ tags }) => {
	const {
		activeBeverageTag,
		setActiveBeverageTag
	} = useGlobalContext();

	useEffect(() => {
		console.log("Log: From BeverageTypeHandler, Tags: ", tags);
	}, []);

	return (
		<div className={`BeverageTagHandler flex flex-col relative px-4 py-2 items-center rounded-xl`}>
			{/* <span className="h-fit flex flex-row justify-center items-center mb-2"><Up /></span> */}
			<div className="flex-1 flex min-h-0">
				<div className="BeverageTagsWrapper flex-1 overflow-auto">
					<div className="BeverageTags flex flex-col overflow-y-auto overflow-x-hidden">
						{tags.map((tag, index) => {
							let boxclass = "";
							if (tag == activeBeverageTag) boxclass = "tagbox-active"
							else boxclass = "tagbox"
							return <Button
								key={index}
								onClick={() => {setActiveBeverageTag(tag)}}
								overrideDefaultStyles={true}
								classes={`${boxclass} my-2 w-36 h-36 rounded-xl text-xl`}
							>
								{/* <img src={type.imgSrc} alt={type.imgAlt ? type.imgAlt : ""}></img> */}
								{tag}
							</Button>
						})}
					</div>
				</div>
			</div>
			{/* <span className="h-fit flex flex-row justify-center items-center mt-2"><Down /></span> */}
		</div>
	);
};

export default BeverageTagHandler;