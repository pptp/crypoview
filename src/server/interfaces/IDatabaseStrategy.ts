export interface IDatabaseStrategy {
  set(name: string, data: any);
  get(name: string): Promise<any>;
  update(data: any);
  on(event: string, name: string, callback: Function);
}

export interface IDatabaseStrategyConstructor {
  connectionType: string;
  new(configuration: any): IDatabaseStrategy;
}
