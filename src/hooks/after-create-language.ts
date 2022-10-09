// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { japChars, EnglishWordChars } from '../language/api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { result, app, params } = context;
    if (result.encode === 'jp') {
      const data = await japChars(result._id);
      console.log(result);
      const addToLanguage = async (typelanguage) => {
        const res = await app.service('languagetype').create(typelanguage, params);
        await app.service('languagechar')
          .patch(
            result._id,
            { 
              $push: {
                charTypeName: {
                  typeName: res.charTypeName,
                  typeId: res._id
                } 
              } 
            },
            params
          );
      }; 
      
      await Promise.all (
        data.charTypeName.map(addToLanguage)
      );
    } else {
      const data = await EnglishWordChars(result._id, result.encode);
      const res = await app.service('languagetype').create(data, params);
      await app.service('languagechar')
        .patch(
          result._id,
          { 
            $set: {
              charTypeName: {
                typeName: res.charTypeName,
                typeId: res._id
              } 
            } 
          },
          params
        );
    }
    return context;
  };
};
