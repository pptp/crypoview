import { IApiStrategy, IApiStrategyConstructor } from 'server/interfaces/IApiStrategy';
import * as config from 'server/config';

export class ApiConnector {
  static create(strategyClass: IApiStrategyConstructor): IApiStrategy {
    const strategyConfiguration = config['apis'][strategyClass.stockName];
    if (!strategyConfiguration) {
      throw new Error(`Stock API '${strategyClass.stockName}' is not configurated`);
    }

    const strategy = new strategyClass(strategyClass.stockName, strategyConfiguration);
    return strategy;
  }
}
