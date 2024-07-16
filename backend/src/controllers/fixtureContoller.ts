import { RequestHandler } from "express";
import FixtureModel from '../models/fixture'
import createHttpError from "http-errors";
import mongoose from "mongoose";



export const getFixtures: RequestHandler = async (req, res, next) => {

  try {  

    const fixtures = await FixtureModel.find().exec();
    res.status(200).json(fixtures);
    
  } catch (error) {
    next(error);
  }
}

export const getFixture: RequestHandler = async (req, res, next) => {

  const fixtureID = req.params.fixtureId;

  try {   

    if(!mongoose.isValidObjectId(fixtureID)){

      throw createHttpError(400, "Invalid fixture ID")
    }

    const fixture = await FixtureModel.findById(fixtureID).exec();
    
    if(!fixture){
      throw createHttpError(404, "Fixture not Found")
    }

    res.status(200).json(fixture)
    
  } catch (error) {

    next(Error)

  }
}

interface CreateFixture {

  home_team: string,
  away_team: string,
  match_date: Date,
  venue: string,
  league: string,
  status: string,
  home_team_score?: number,
  away_team_score?: number

}

export const addFixture: RequestHandler<unknown, unknown, CreateFixture, unknown> = async (req, res, next) => {

  const {home_team, away_team, match_date, venue, league, status, home_team_score, away_team_score} = req.body

  const requiredFields = [home_team, away_team, match_date, venue, league, status];


  try {

    if (requiredFields.some(field => !field)) {

      throw createHttpError(400, "Fixture is missing a required feature!");
    }

    const newFixture = await FixtureModel.create({
      home_team: home_team,
      away_team: away_team,
      match_date: match_date,      
      venue: venue,
      league: league,
      status: status,
      home_team_score: home_team_score,
      away_team_score: away_team_score
    })

    res.status(201).json(newFixture)
    
  } catch (error) {

    next(error);
  }
}

interface UpdateFixture {

  home_team: string,
  away_team: string,
  match_date: Date,
  venue: string,
  league: string,
  status: string,
  home_team_score?: number,
  away_team_score?: number
}

interface UpdateFixtureParams{

  fixtureId: string
}

export const updateFixture: RequestHandler<UpdateFixtureParams, unknown, UpdateFixture, unknown> = async (req, res, next) => {


  const fixtureID = req.params.fixtureId;
  
  const {home_team: new_home_team, away_team: new_away_team, match_date: new_match_date, venue: new_venue, league: new_league, status: new_status, home_team_score: new_home_team_score, away_team_score: new_away_team_score} = req.body

  const requiredFields = [new_home_team, new_away_team, new_match_date, new_venue, new_league, new_status];

  try {

    if(!mongoose.isValidObjectId(fixtureID)){

      throw createHttpError(400, "Invalid fixture ID")
    }

    if (requiredFields.some(field => !field)) {

      throw createHttpError(400, "Fixture is missing a required feature!");
    }

    const staff = await FixtureModel.findById(fixtureID).exec(); 

    if(!staff){
      throw createHttpError(404, "Fixture not Found")
    }

    Object.assign(staff, {
      home_team: new_home_team,
      away_team: new_away_team,
      match_date: new_match_date,
      venue: new_venue,
      league: new_league,
      status: new_status,
      home_team_score: new_home_team_score,
      away_team_score: new_away_team_score
    })

    const updatedFixture = await staff.save();

    res.status(200).json(updatedFixture)
    
  } catch (error) {

    next(error)
    
  }
}

export const deleteFixture: RequestHandler = async (req, res, next) => {

  const fixtureID = req.params.fixtureId;

  try {

    if(!mongoose.isValidObjectId(fixtureID)){

      throw createHttpError(400, "Invalid Fixture ID")
    }

    const fixture = await FixtureModel.findByIdAndDelete(fixtureID).exec();

    if(!fixture){
      throw createHttpError(404, "Fixture not Found")
    }

    res.status(204).json(fixture)
    
  } catch (error) {

    next(error)
  }


}
