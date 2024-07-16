import { InferSchemaType, model, Schema } from "mongoose";



const staffSchema = new Schema({

  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  role: {type: String, required: true},
  profile_picture: {type: String},
  bio: {type: String}

}, {timestamps: true})

type Staff = InferSchemaType<typeof staffSchema>;

export default model<Staff>("Staff", staffSchema);