import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import qrcode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';


export class Channelchat extends Service {
  private readonly app: Application;
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async create(data, params){
    const ruuid = uuidv4();
    const token = crypto.createHmac('sha256', `secret-${ruuid}`).update(`this for app ${data.name}`).digest('hex');
    const url = `/room/${data.name}/?roomid=${ruuid}&h=${token}`;

    const admin = params.user._id;

    const createdData = {
      ...data,
      ruuid,
      token,
      url,
      admin
    };

    if(params.connection){
      this.app.channel(`room/${data.name}-${data.ruuid}`).join(params.connection);
    }
    return this.create(createdData, params);
  }

  async remove(id, params) {
    const data = await this.get(id, params);
    if(params.connection) {
      this.app.channel(`room/${data.name}-${data.ruuid}`).leave(connection => {
        return data.usersIn.includes(connection.user._id);
      });
    }
    return this.remove(id, params);
  }
}
