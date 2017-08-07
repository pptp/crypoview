import { IApiAdapter } from '../interfaces/IApiAdapter';
import { IDatabaseAdapter } from 'server/interfaces/IDatabaseAdapter';

import { ICoin } from 'common/interfaces/ICoin';
import { IMarket } from 'common/interfaces/IMarket';
import { IMarketHistoryCollection, IMarketHistory } from 'common/interfaces/IMarketHistory';

export class Parser {
  constructor(protected db: IDatabaseAdapter) {}

  async execute(connector: IApiAdapter) {
    await this.saveCoins(connector);
    await this.saveMarkets(connector);
    await this.saveHistory(connector);
  }

  async saveHistory(connector: IApiAdapter) {
    try {
      console.log('Start save history');

      // show ANS and LTC just for test and do not save a lot of data in cloud db
      const historySrc: IMarketHistoryCollection = await connector.history(['BTC-NEO', 'BTC-LTC']);
      const history = {};
      Object.keys(historySrc).forEach((marketName) => {
        history[marketName] = historySrc[marketName].reduce((result: any, current: IMarketHistory) => {
          result[current.id] = current;
          return result;
        }, {});
      });
      console.log('Markets histories fetched: ', Object.keys(history).length);

      const dbHistory = await this.db.get(`stocks/${connector.name}`) || {};
      console.log('Markets histories existed: ', Object.keys(dbHistory).length);


      const updates = {};
      Object.keys(history).forEach((name) => {
        if (dbHistory[name]) {
          Object.keys(history[name]).forEach((historyId: string) => {
            if (!dbHistory[historyId]) {
              if (!updates[name]) {
                updates[name] = {};
              }
              updates[name][historyId] = history[name][historyId];
            }
          });
        } else {
          updates[name] = history[name];
        }
      });

      const updateCount = Object.keys(updates).length;
      if (updateCount) {
        console.log('Markets histories to update: ', updateCount);
        console.log('Update started');
        const objToUpdate = {};
        objToUpdate[`/stocks/${connector.name}`] = updates;
        this.db.update(objToUpdate);
        console.log('Update finished');
      } else {
        console.log('Update is not required');
      }
    } catch (e) {
      console.error(`Error while executing 'saveHistory:'`);
      console.error(e);
    }
  }

  async saveMarkets(connector: IApiAdapter) {
    try {
      console.log('Start save markets');

      const marketsArray = await connector.markets();
      const markets = marketsArray.reduce((result: any, current: IMarket) => {
        result[current.name] = current;
        return result;
      }, {});

      console.log('Markets fetched: ', Object.keys(markets).length);

      const dbMarkets = await this.db.get('markets') || {};
      console.log('Markets existed: ', Object.keys(dbMarkets).length);

      const updates = {};
      Object.keys(markets).forEach((name) => {
        if (!dbMarkets[name]) {
          updates[name] = markets[name];
        }
      });

      const updateCount = Object.keys(updates).length;
      if (updateCount) {
        console.log('Markets to update: ', updateCount);
        console.log('Update started');
        this.db.update({'/markets': updates});
        console.log('Update finished');
      } else {
        console.log('Update is not required');
      }
    } catch (e) {
      console.error(`Error while executing 'saveMarkets:'`);
      console.error(e);
    }
  }

  async saveCoins(connector: IApiAdapter) {
    try {
      console.log('Start save coins');

      const coinsArray = await connector.coins();
      const coins = coinsArray.reduce((result: any, current: ICoin) => {
        result[current.name] = current;
        return result;
      }, {});
      console.log('Coins fetched: ', Object.keys(coins).length);

      const dbCoins = await this.db.get('coins') || {};
      console.log('Coins existed: ', Object.keys(dbCoins).length);


      const updates = {};

      Object.keys(coins).forEach((name) => {
        if (!dbCoins[name]) {
          updates[name] = coins[name];
        }
      });


      const updateCount = Object.keys(updates).length;
      if (updateCount) {
        console.log('Coins to update: ', updateCount);
        console.log('Update started');
        this.db.update({'/coins': updates});
        console.log('Update finished');
      } else {
        console.log('Update is not required');
      }
    } catch (e) {
      console.error(`Error while executing 'saveCoins:'`);
      console.error(e);
    }
  }
}
