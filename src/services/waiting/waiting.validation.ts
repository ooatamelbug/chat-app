import * as Joi from 'joi';

export const createSchema = Joi.object().keys({
  userId: Joi.string().trim().required(),
  roomId: Joi.string().trim().required(),
  userConnectionId: Joi.string().trim().required(),
  roomName: Joi.string().trim().required(),
  memberNumber: Joi.number(),
  linkRoom: Joi.link(),
  status: Joi.boolean()
});

