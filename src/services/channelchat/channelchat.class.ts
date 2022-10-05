import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';

export class Channelchat extends Service {
  private readonly app: Application;
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async create(data, params){
    if(params.connection){
      this.app.channel(`room/${data.name}${data.ruuid}`).join(params.connection);
    }
    return this.create(data, params);
  }

  async remove(id, params) {
    const data = await this.get(id, params);
    if(params.connection) {
      this.app.channel(`room/${data.name}${data.ruuid}`).leave(connection => {
        return data.usersIn.includes(connection.user._id);
      });
    }
    return this.remove(id, params);
  }
}
