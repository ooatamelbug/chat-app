// roomchatmessage-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import mongoose, { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'roomchatmessage';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    text: { type: String, required: true },
    takeTime: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    channelchat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    likes: Number,
    room: String,
    status: {
      pass: Boolean,
      play: Boolean,
      change: Boolean,
    }
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
