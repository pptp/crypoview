import { app } from 'server';
import { AbstractController } from 'server/base/AbstractController';
import * as express from 'express';
import { Controller } from 'server/base/decorators/Controller';

// @Controller('/coins')
export class CoinsController extends AbstractController {
  route = '/coins';

  async get(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    //
  }
}
