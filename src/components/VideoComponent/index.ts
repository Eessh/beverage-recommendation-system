import VideoComponent from "./VideoComponent";

/**
 * ```
 * IAgeRange {
 *   lower: number,
 *   higher: number
 * }
 * ```
 */
 export interface IAgeRange {
  lower: number,
  upper: number
};

/**
 * ```
 * IBeveragePercent {
 *   type: string,
 *   percent: number
 * }
 * ```
 */
export interface IBeveragePercent {
  type: string,
  percent: number
};

export type TBeveragesTypes = Array<string>;
export type TAgeRanges = Array<IAgeRange>;
// export type TBeveragesData = Map<string, Map<IAgeRange, Array<IBeveragePercent>>>;
export type TBeveragesData = Array<Array<Array<IBeveragePercent>>>;

export default VideoComponent;