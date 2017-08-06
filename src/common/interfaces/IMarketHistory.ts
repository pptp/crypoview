export interface IMarketHistoryCollection {
  [name: string]: Array<IMarketHistory>;
}

export interface IMarketHistory {
  id: number;
  timestamp: number;
  quantity: number;
  price: number;
  total: number;
}
