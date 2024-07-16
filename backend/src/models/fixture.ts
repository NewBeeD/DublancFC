import { InferSchemaType, model, Schema } from "mongoose";



const fixtureSchema = new Schema({

  home_team: {type: String, required: true},
  away_team: {type: String, required: true},
  match_date: {type: Date, required: true},
  venue: {type: String, required: true},
  league: {type: String, required: true},
  status: {type: String, required: true},
  home_team_score: {type: Number},
  away_team_score: {type: Number},

  

}, {timestamps: true})

type Fixture = InferSchemaType<typeof fixtureSchema>;

export default model<Fixture>("Fixture", fixtureSchema);