import { ICoin } from './ICoin';
import { IStock } from './IStock';
import { IMarket } from './IMarket';

export interface IDatabase {
  coins: {
    [name: string]: ICoin;
  };
  markets: {
    [name: string]: IMarket;
  };
  stocks: {
    [name: string]: IStock;
  };
}
