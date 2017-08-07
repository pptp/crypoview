import { Server } from './Server';
import { IController } from './interfaces/IController';
import { IRepository } from './interfaces/IRepository';
// import * as firebase from 'firebase';
import { DatabaseConnector } from 'server/base/DatabaseConnector';
import { FirebaseAdapter } from 'server/base/db/FirebaseAdapter';

export class App {
  protected server;
  public db;

  constructor() {
    this.server = new Server();

    this.db = DatabaseConnector.create(FirebaseAdapter);
  }

  bootstrap() {
    this.server.run();
  }

  registerController(controller: IController) {
    this.server.registerController(controller);
  }
}
