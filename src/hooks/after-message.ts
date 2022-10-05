// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { result, app, params } = context;
    const message = result.messages[result.messages.length -1];
    const prevPlayer = message.userId;
    const status = message.status;
    const word = message.messageText;
    const char = word.slice(-1);
    const playerNumber = message.playerNumber;
    const users = await app.service('channelchat').get(result.channelchat, params);
    let nextPlayer;
    if((playerNumber + 1) >= users.usersIn.length){
      nextPlayer = users.usersIn[0].userId;
    } else {
      const player = users.usersIn.filter( user => {
        return user.numberInter === playerNumber + 1;
      });
      nextPlayer = player[0].userId;
    } 
    const change = status.change ? 1 : 0;
    const changeStatus = status.change ? true : false;
    const channelStatus = await app.service('channelstatus').find({ query: {roomChannelId: result.channelchat} });
    const changeWordTimes = channelStatus.data[0].changeWord.times + change;
    const playerStatus = channelStatus.data[0].playerStatus;
    const newPlayerStatus = playerStatus.map(stat => {
      if (stat.userId === prevPlayer) stat.times = status.play ? stat.times + 1 : stat.times;
      if (stat.userId === prevPlayer) stat.status = false;
      if (stat.userId === nextPlayer) stat.status = true;
      return stat;
    });

    await app.service('channelstatus').update(
      null, 
      {
        nextPlayer,
        currentPlayer: prevPlayer,
        roomChannelId: result.channelchat,
        timesPlay: status.play ? channelStatus.data[0].timesPlay +1 : (channelStatus.data[0].timesPlay),
        lastWord: word,
        lastChar:char,
        startChar: channelStatus.data[0].startChar,
        stopStatus: channelStatus.data[0].stopStatus,
        changeWord: { times: changeWordTimes, status: changeStatus},
        playerStatus: newPlayerStatus
      },
      {
        ...params,
        query: {
          _id: channelStatus.data[0]._id
        }
      }
    );
    
    return context;
  };
};
