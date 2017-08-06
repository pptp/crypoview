import { IMarketHistoryCollection } from './IMarketHistory';

export interface IStock {
  // name: string;
  // marketPrices: Array<IMarketPrice>;

  history: IMarketHistoryCollection;
}
