// languagechar-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import mongoose, { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'languagechar';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    languageName: { type: String, required: true },
    encode: { 
      type: String,
      required: true,
      unique: true
    },
    charTypeName: [
      {
        typeName: String,
        typeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'languagetype',
          required: true, 
        }
      }
    ]
    // languageName: { type: String, required: true },
    // charNumber: Number,
    // charType: [String],
    // chars: [
    //   {
    //     charType: String,
    //     charNumber: Number,
    //     charsInType: [
    //       {
    //         level: String,
    //         levelName: String,
    //         numberInLevel: Number,
    //         chars: [String]
    //       }
    //     ]
    //   }
    // ]
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
