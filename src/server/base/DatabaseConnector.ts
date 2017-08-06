import { IDatabaseStrategy, IDatabaseStrategyConstructor } from 'server/interfaces/IDatabaseStrategy';
import * as config from 'server/config';

export class DatabaseConnector {
  static create(strategyClass: IDatabaseStrategyConstructor): IDatabaseStrategy {
    const strategyConfiguration = config['db'][strategyClass.connectionType];
    if (!strategyConfiguration) {
      throw new Error(`Database '${strategyClass.connectionType}' is not configurated`);
    }

    const strategy = new strategyClass(strategyConfiguration);
    return strategy;
  }
}
