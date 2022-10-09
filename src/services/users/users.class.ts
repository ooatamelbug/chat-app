import { UsersDTO } from './dto/user.dto';
import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import * as crypto from 'crypto';
import qrcode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';

export class Users extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  async create(data: Partial<UsersDTO>, params: any): Promise<any> {
    const { 
      email, 
      password, 
      googleId, 
      facebookId, 
      twitterId, 
      firstname,
      lastname,
      profilePicture
    } = data;

    let genImage;
    if (profilePicture == null) {
      const hash = crypto.createHash('md5').update(email?.toLowerCase() as string).digest('hex');
      const avater = `https://s.gravater.com/avater/${hash}?s=60`;
      genImage = avater;
    }

    const uuidData = uuidv4(); 
    const qrcodeImage = await qrcode.toDataURL(uuidData, { margin: 2 });
 

    const newUser = {
      email,
      password,
      uuid: uuidData,
      qrcodeImage,
      googleId,
      facebookId,
      twitterId,
      firstname,
      lastname,
      image: (!profilePicture ? genImage : profilePicture)
    };

    return super.create(newUser, params);
  }
}
