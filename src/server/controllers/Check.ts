import { app } from 'server';
import { AbstractController } from 'server/base/AbstractController';
import * as express from 'express';
import { testRepository } from 'server/repositories/Test';
import { Controller } from 'server/base/decorators/Controller';

@Controller('/check')
class CheckController extends AbstractController {
  async get(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const token = req.params[0];

    res.send('asd');

    next();
  }
}
