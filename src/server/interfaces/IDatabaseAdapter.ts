export interface IDatabaseAdapter {
  set(name: string, data: any);
  get(name: string): Promise<any>;
  update(data: any);
  on(event: string, name: string, callback: Function);
}

export interface IDatabaseAdapterConstructor {
  connectionType: string;
  new(configuration: any): IDatabaseAdapter;
}
