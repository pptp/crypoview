import * as express from 'express';

import { IRepository } from 'server/interfaces/IRepository';

export abstract class AbstractRepository implements IRepository {
  protected db;
  constructor(db) {
    this.db = db;
  }
}
