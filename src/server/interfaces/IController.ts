import * as express from 'express';

export interface IController {
  init();

  route: string;
  register(router: express.IRoute);

  get?(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  );

  post?(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  );

  put?(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  );

  delete?(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  );

  all?(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  );
}
