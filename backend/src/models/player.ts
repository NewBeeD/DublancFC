import { InferSchemaType, model, Schema } from "mongoose";



const playerSchema = new Schema({

  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  age: {type: Number, required: true},
  birth_date: {type: Date, required: true},
  position: {type: String, required: true},
  gender: {type: String, required: true},
  league: {type: String, required: true},
  foot: {type: String},
  kit: {type: Number},
  height: {type: Number},
  weight: {type: Number},
  profile_picture: {type: String},
  stats: {type: Object},
  player_bio: {type: String}

}, {timestamps: true})

type Player = InferSchemaType<typeof playerSchema>;

export default model<Player>("Player", playerSchema);