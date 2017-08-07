import { ICoin } from 'common/interfaces/ICoin';
import { IMarket } from 'common/interfaces/IMarket';
import { IMarketHistoryCollection } from 'common/interfaces/IMarketHistory';

export interface IApiAdapter {
  name: string;
  history(markets: Array<string>): Promise<IMarketHistoryCollection>;
  markets(): Promise<Array<IMarket>>;
  coins(): Promise<Array<ICoin>>;
}

export interface IApiAdapterConstructor {
  stockName: string;
  new(name: string, configuration: any): IApiAdapter;
}
