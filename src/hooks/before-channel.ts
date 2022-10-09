// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, params, method } = context;
    if (method === 'find' && params.query.data === 'playersCount') {
      await app.service('channelstatus').Model.aggregate([
        {
          $match: { admin: params.user._id }
        },
        {
          $unwind: '$usersIn',
        },

      ]);
    }
    return context;
  };
};
