// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, result, params } = context;
    if(result.status) {
      await app.service('channelchat').update(
        null,
        {
          $push: {
            usersWait: {
              userId: result.userId,
              timeInter: result.created_at,
              numberInter: result.memberNumber,
            },
          },
        },
        {
          ...params,
          query: {
            _id: result.roomId
          }
        }
      );
      await app.service('channelchat').update(
        null,
        {
          $pullAll: {
            usersWait: { userId: result.userId }
          }
        },
        {
          ...params,
          query: {
            _id: result.roomId
          }
        }
      );
    }
    await app.service('waiting').remove(result._id,params);

    return context;
  };
};
