import { UsersDTO } from './dto/user.dto';
import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import * as crypto from 'crypto';

export class Users extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  create(data: Partial<UsersDTO>, params: any): Promise<any> {
    const { 
      email, 
      password, 
      googleId, 
      facebookId, 
      twitterId, 
      fullname,
      image
    } = data;

    let genImage;
    if (image == null) {
      const hash = crypto.createHash('md5').update(email?.toLowerCase() as string).digest('hex');
      const avater = `https://s.gravater.com/avater/${hash}?s=60`;
      genImage = avater;
    }

    const newUser = {
      email,
      password,
      googleId,
      facebookId,
      twitterId,
      fullname,
      image: (!image ? genImage : image)
    };

    return super.create(newUser, params);
  }
}
