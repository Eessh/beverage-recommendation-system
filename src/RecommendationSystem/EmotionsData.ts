// This data is based on this research paper:
// https://ijarsct.co.in/Paper928.pdf

import { TEmotionsData } from "../components/VideoComponent/data";
import { TEmotionsWeights } from "../Types";

const EmotionsData: TEmotionsData = {
	happy: ["Healthy", "Juices", "Coffee", "Chocolate"],
	sad: ["Chocolate", "Tea", "Coffee"],
	neutral: ["Healthy"],
	angry: ["Tea", "Coffee"],
	fear: ["Water"],
	disgusted: ["Water"],
	surprise: ["Water"]
};

const EmotionsWeights: TEmotionsWeights = {
	happy: 5,
	sad: 10,
	neutral: 1,
	angry: 10,
	fearful: 15,
	disgusted: 15,
	surprised: 5
};

export {
	EmotionsData,
	EmotionsWeights
}