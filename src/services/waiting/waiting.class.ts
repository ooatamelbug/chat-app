import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';

export class Waiting extends Service {
  private readonly app: Application;
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async patch(id, data, params) {
    if (data.status && params.connection) {
      this.app.channel(`room/${data.roomId}`).join(params.connection);
    } else if (!data.status && params.connection) {
      this.app.channel(`room/${data.roomId}`).leave(params.connection);
      return this.remove(id, params);
    }
    return this.patch(id, data, params);
  }
}
