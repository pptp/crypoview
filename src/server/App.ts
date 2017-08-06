import { Server } from './Server';
import { IController } from './interfaces/IController';
import { IRepository } from './interfaces/IRepository';
// import * as firebase from 'firebase';
import { DatabaseConnector } from 'server/base/DatabaseConnector';
import { FirebaseStrategy } from 'server/base/db/FirebaseStrategy';

export class App {
  protected server;
  public db;

  constructor() {
    this.server = new Server();

    this.db = DatabaseConnector.create(FirebaseStrategy);
  }

  bootstrap() {
    this.server.run();
  }

  registerController(controller: IController) {
    this.server.registerController(controller);
  }
}
