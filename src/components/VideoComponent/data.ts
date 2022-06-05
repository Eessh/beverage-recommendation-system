import { IAgeRange } from ".";

const BeverageTypes: string[] = ["Carbonated Drinks", "Energy Drinks", "Juices", "Milk", "Coffee", "Tea"];
const AgeRanges: Array<IAgeRange> = [
  {lower: Number.NEGATIVE_INFINITY, upper: 17},
  {lower: 18, upper: 24},
  {lower: 25, upper: 35},
  {lower: 36, upper: 45},
  {lower: 46, upper: 55},
  {lower: 56, upper: 65},
  {lower: 66, upper: Number.POSITIVE_INFINITY}
];
const MaleBeveragesData: Array<Array<number>> = [
  [1.7 ,   6.3 ,   8.7 ,   5.2 ,   0.7 ,   0.4 ],
  [37.5,   31.2,   30.4,   24.7,   14.2,   27.2],
  [31.9,   35.7,   32.2,   42.3,   32  ,   40.6],
  [22.8,   21.7,   19.1,   17.5,   34  ,   19.2],
  [5.6 ,   4.5 ,   7.0 ,   7.2 ,   14.8,   8   ],
  [0.4 ,   0.5 ,   2.6 ,   0   ,   3.4 ,   2.7 ],
  [0   ,   0   ,   0   ,   3.1 ,   0.9 ,   1.8 ],
];
const FemaleBeveragesData: Array<Array<number>> = [
  [1.3 ,   0.4 ,   1.5 ,   6.3 ,   2.9 ,   6.5 ],
  [35.5,   25.8,   36.3,   37.5,   40.3,   44.1],
  [31.6,   33.3,   26.7,   43.8,   29.2,   29.9],
  [16.2,   29.1,   20.3,   12.5,   16.7,   12  ],
  [9   ,   9.9 ,   14.0,   0   ,   8.8 ,   5.6 ],
  [4.1 ,   1.3 ,   0.8 ,   0   ,   1.8 ,   1.5 ],
  [2.3 ,   0.4 ,   0.4 ,   0   ,   0.2 ,   0.3 ],
];

export {
  BeverageTypes,
  AgeRanges,
  MaleBeveragesData,
  FemaleBeveragesData
};