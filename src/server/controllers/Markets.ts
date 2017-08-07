import { app } from 'server';
import { AbstractController } from 'server/base/AbstractController';
import * as express from 'express';
import { Controller } from 'server/base/decorators/Controller';

@Controller('/markets')
export class CoinsController extends AbstractController {

  async get(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const markets = await app.db.get('/markets');
    res.send(markets);
  }
}
