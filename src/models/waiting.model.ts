// waiting-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import mongoose, { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'waiting';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    roomId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'channelchat', 
      required: true 
    },
    userConnectionId: String,
    roomName: String,
    memberNumber: Number,
    linkRoom: String,
    status: Boolean
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
