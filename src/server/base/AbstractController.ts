import * as express from 'express';

import { IController } from 'server/interfaces/IController';

export abstract class AbstractController implements IController {

  abstract get route();

  public init() {
    //
  }

  register(router: express.IRoute) {
    const possibleMethods = [
      'get',
      'post',
      'put',
      'delete',
      'all'
    ];

    possibleMethods.forEach((method: string) => {
      // pizdec
      if (this[method]) {
        router[method](this[method].bind(this));
      }
    });
  }
}
