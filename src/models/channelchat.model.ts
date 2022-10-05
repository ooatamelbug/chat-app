// channelchat-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import mongoose, { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'channelchat';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    name: { type: String, required: true }, 
    ruuid: String,
    url: { type: String },
    desc: { type: String },
    type: { type: String },
    status: { type: Boolean },
    typestop: {
      type: Boolean
    }, 
    typeWord: {
      lang: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'languagechar',
        required: true, 
      },
      spiecal: {
        status: Boolean,
        alpha: String,
      }
    },
    typeChar: {
      random: Boolean,
      char: String
    },
    room: {
      type: String,
    },
    admin: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    usersIn: [{
      userId:  { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
      timeInter: Date,
      numberInter: Number,
    }],
    usersWait: [{
      userId:  { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
      timeInter: Date,
      numberInter: Number,
    }],  
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
