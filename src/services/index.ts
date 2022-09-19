import { Application } from '../declarations';
import users from './users/users.service';
import channelchat from './channelchat/channelchat.service';
import channelstatus from './channelstatus/channelstatus.service';
import roomchatmessage from './roomchatmessage/roomchatmessage.service';
import notemessage from './notemessage/notemessage.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(channelchat);
  app.configure(channelstatus);
  app.configure(roomchatmessage);
  app.configure(notemessage);
}
