import { app } from 'server';
import { IController } from 'server/interfaces/IController';
import { AbstractController } from 'server/base/AbstractController';

export function Controller(route) {
  return function classDecorator<T extends { new(...args: any[]): AbstractController }>(constructor: T) {
    class Instance extends constructor  {
      route = route;
    }

    const controller = new Instance();
    app.registerController(controller);
  };
}
