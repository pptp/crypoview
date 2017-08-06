import { app } from 'server';
import { AbstractController } from 'server/base/AbstractController';
import * as express from 'express';
import { testRepository } from 'server/repositories/Test';

class CheckController extends AbstractController {
  route = '/check';

  async get(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const token = req.params[0];

    testRepository.inc();

    const data = await testRepository.get();
    console.log(data);

    res.send('asd' + data);

    next();
  }
}

const controller = new CheckController();
app.registerController(controller);
