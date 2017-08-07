import { app } from 'server';
import { AbstractController } from 'server/base/AbstractController';
import * as express from 'express';
import { Controller } from 'server/base/decorators/Controller';

@Controller('/history/:market')
export class CoinsController extends AbstractController {

  async get(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const history = await app.db.get(`/stocks/bittrex/${req.params.market}`);
    res.send(history);
  }
}
