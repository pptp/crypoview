import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as methodOverride from 'method-override';

import { IController } from './interfaces/IController';

export class Server {
  protected app: express.Application;

  constructor() {
    this.app = express();
  }

  protected config() {
    const { app } = this;

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use((err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) => {

      res.status(err.code || 500)
          .send(err || 'An error occurred during the request.');
      }
    );

    app.use(express.static('./static'));
  }

  public registerController(controller: IController) {
    const { app } = this;
    // console.log(controller);
    const router = app.route(controller.route);
    controller.register(router);
  }

  public run() {
    this.config();

    this.app.listen(8080);
  }
}
