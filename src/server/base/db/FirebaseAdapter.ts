import { IDatabaseAdapter, IDatabaseAdapterConstructor } from 'server/interfaces/IDatabaseAdapter';
import * as firebase from 'firebase';

export class FirebaseAdapter implements IDatabaseAdapter {
  static connectionType = 'firebase';
  protected db;

  constructor(protected configuration) {
    const firebaseApp = firebase.initializeApp(configuration);
    this.db = firebaseApp.database();
  }

  ref(name: string) {
    return this.db.ref(name);
  }

  set(name: string, data: any) {
    this.db.ref(name).set(data);
  }

  async get(name: string) {
    const snapshot = await this.ref(name).once('value');
    return snapshot.val();
  }

  update(data: any) {
    this.db.ref().update(data);
  }

  on(event: string, name: string, callback: Function) {
    this.ref(name).on(event, callback);
  }

  off(event: string, name: string) {
    this.ref(name).off(event);
  }
}
