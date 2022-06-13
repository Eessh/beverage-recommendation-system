import { useGlobalContext } from "../../GlobalContext";
import { TTag } from "../../Types";
import { Button } from "../Animated";
import "./BeverageTagHandler.css";
import {useEffect, useState} from "react";

export type TTagHandlerProps = {
	tags: TTag[]
};

const BeverageTagHandler: React.FC<TTagHandlerProps> = ({ tags }) => {
	const { setActiveBeverageTag } = useGlobalContext();

	useEffect(() => {
		console.log("Log: From BeverageTypeHandler, Tags: ", tags);
	}, []);

	return (
		<div className={`BeverageTagHandler h-[920px] flex flex-col relative px-2 py-1 items-center bg-slate-100 rounded-xl`}>
			{/* <span className="h-fit flex flex-row justify-center items-center mb-2"><Up /></span> */}
			<div className="flex-1 flex min-h-0">
				<div className="BeverageTagsWrapper flex-1 overflow-auto">
					<div className="BeverageTags flex flex-col overflow-y-auto overflow-x-hidden">
						{tags.map((tag, index) => {
							return <Button
								key={index}
								onClick={() => {setActiveBeverageTag(tag)}}
								overrideDefaultStyles={true}
								classes="my-1 w-36 h-36 bg-slate-200 rounded-xl text-xl"
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