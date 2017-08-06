import { app } from 'server';
import { AbstractRepository } from 'server/base/AbstractRepository';

export class Test extends AbstractRepository {
  async get() {
    const data = await this.db.ref('test').once('value');
    return data.val();
  }

  async inc() {
    const data = (await this.get()) || 0;
    return this.db.ref('test').set(data + 1);
  }
}

const testRepository = new Test(app.db);
export { testRepository };
