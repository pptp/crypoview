import * as moment from 'moment';

import { IApiStrategy } from 'server/interfaces/IApiStrategy';
import * as bittrex from 'node.bittrex.api';

import { ICoin } from 'common/interfaces/ICoin';
import { IMarket } from 'common/interfaces/IMarket';
import { IMarketHistory, IMarketHistoryCollection } from 'common/interfaces/IMarketHistory';

export class BittrexStrategy implements IApiStrategy {
  static stockName = 'bittrex';

  constructor(public name, protected configuration) {
  }

  async history(markets: Array<string>): Promise<IMarketHistoryCollection> {
    /*
      {
        Id: 13877368,
        TimeStamp: '2017-08-06T12:40:05.27',
        Quantity: 25.85787921,
        Price: 0.00469,
        Total: 0.12127345,
        FillType: 'PARTIAL_FILL',
        OrderType: 'BUY'
      }
    */

    const result: IMarketHistoryCollection = {};

    const promises = markets.map((market) => {
      return new Promise((resolve, reject) => {
        bittrex.getmarkethistory({ market }, (serverResponse, error) => {
          if (error) {
            reject(error);
          }
          if (serverResponse.result) {
            result[market] = <Array<IMarketHistory>> serverResponse.result
                .map((serverHistory) => {
                  return <IMarketHistory> {
                    id: serverHistory.Id,
                    timestamp: moment(serverHistory.TimeStamp).unix(),
                    quantity: serverHistory.Quantity,
                    price: serverHistory.Price,
                    total: serverHistory.Total
                  };
                });
            resolve();
          } else {
            reject(serverResponse);
          }
        });
      });
    });

    return Promise.all(promises).then(() => result);

    /*
      export interface IMarketHistory {
        timestamp: string;
        quantity: number;
        price: number;
        total: number;
      }
    */
  }

  async markets(): Promise<Array<IMarket>> {
    const promise = new Promise<Array<IMarket>>((resolve, reject) => {
      bittrex.getmarkets((serverResponse, error) => {
        if (error) {
          reject(error);
        }
        if (serverResponse.result) {
          const coins: Array<IMarket> = serverResponse.result
              .filter((serverMarket) => serverMarket.IsActive)
              .map((serverMarket) => {
                return <IMarket>{
                    name: serverMarket.MarketName,
                    baseCoin: serverMarket.BaseCurrency,
                    marketCoin: serverMarket.MarketCurrency
                };
              });
          resolve(<Array<IMarket>>coins);
        } else {
          reject(serverResponse);
        }
      });
    });

    return await promise;
  }

  async coins(): Promise<Array<ICoin>> {
    const promise = new Promise<Array<ICoin>>((resolve, reject) => {
      bittrex.getcurrencies((serverResponse, error) => {
        if (error) {
          reject(error);
        }
        if (serverResponse.result) {
          const coins: Array<ICoin> = serverResponse.result
              .filter((serverCoin) => serverCoin.IsActive)
              .map((serverCoin) => {
                return <ICoin>{
                  name: serverCoin.Currency,
                  longname: serverCoin.CurrencyLong
                };
              });
          resolve(<Array<ICoin>>coins);
        } else {
          reject(serverResponse);
        }
      });

    });

    return await promise;
  }
}
