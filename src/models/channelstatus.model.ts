// channelstatus-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import mongoose, { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'channelstatus';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    nextPlayer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',    
    },
    pastPlayer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',    
    },
    timePlay: Number,
    lastWord: String,
    lastChar: String,
    startChar: String,
    stopStatus: Boolean,
    changeWord: {
      times: Number,
      status: Boolean,
    },
    playerStatus: [{
      users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',   
      },
      times: Number,
      status: Boolean
    }]
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
