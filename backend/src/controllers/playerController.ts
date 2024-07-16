import { RequestHandler } from "express";
import PlayerModel from '../models/player'
import createHttpError from "http-errors";
import mongoose from "mongoose";



export const getPlayers: RequestHandler = async (req, res, next) => {

  try {  

    const players = await PlayerModel.find().exec();
    res.status(200).json(players);
    
  } catch (error) {
    next(error);
  }
}

export const getPlayer: RequestHandler = async (req, res, next) => {

  const playerID = req.params.playerId;

  try {   

    if(!mongoose.isValidObjectId(playerID)){

      throw createHttpError(400, "Invalid player ID")
    }

    const player = await PlayerModel.findById(playerID).exec();
    
    if(!player){
      throw createHttpError(404, "Player not Found")
    }

    res.status(200).json(player)
    
  } catch (error) {

    next(Error)

  }
}

interface CreatePlayer {

  first_name: string,
  last_name: string,
  age: number,
  birth_date: Date,
  position: string,
  gender: string,
  league: string,
  foot?: string,
  height?: number,
  kit?: number,
  profile_picture?: string,
  weight?: number,
  stats?: object,
  player_bio?: string

}

export const addPlayer: RequestHandler<unknown, unknown, CreatePlayer, unknown> = async (req, res, next) => {

  const {first_name, last_name, age, birth_date, position, gender, league, foot, height, kit, profile_picture, weight, stats, player_bio} = req.body

  const requiredFields = [first_name, last_name, age, birth_date, position, gender, league];


  try {

    if (requiredFields.some(field => !field)) {

      throw createHttpError(400, "Player is missing a required feature!");
    }

    const newPlayer = await PlayerModel.create({
      first_name: first_name,
      last_name: last_name,
      age: age,
      birth_date: birth_date,
      position: position,
      gender: gender,
      league: league,
      foot: foot,
      height: height,
      kit: kit,
      profile_picture: profile_picture,
      weight: weight,
      stats: stats,
      player_bio: player_bio
    })

    res.status(201).json(newPlayer)
    
  } catch (error) {

    next(error);
    
  }
}

interface UpdatePlayer {

  first_name: string,
  last_name: string,
  age: number,
  birth_date: Date,
  position: string,
  gender: string,
  league: string,
  foot?: string,
  height?: number,
  kit?: number,
  profile_picture?: string,
  weight?: number,
  stats?: object,
  player_bio?: string

}

interface UpdatePlayerParams{

  playerId: string
}



export const updatePlayer: RequestHandler<UpdatePlayerParams, unknown, UpdatePlayer, unknown> = async (req, res, next) => {


  const playerID = req.params.playerId;
  
  const {first_name: new_first_name, last_name: new_last_name, age: new_age, birth_date: new_birth_date, position: new_position, gender: new_gender, league: new_league, foot: new_foot, height: new_height, kit: new_kit, profile_picture: new_profile_picture, weight: new_weight, stats: new_stats, player_bio: new_player_bio} = req.body

  const requiredFields = [new_first_name, new_last_name, new_age, new_birth_date, new_position, new_gender, new_league];

  try {

    if(!mongoose.isValidObjectId(playerID)){

      throw createHttpError(400, "Invalid player ID")
    }

    if (requiredFields.some(field => !field)) {

      throw createHttpError(400, "Player is missing a required feature!");
    }

    const player = await PlayerModel.findById(playerID).exec(); 

    if(!player){
      throw createHttpError(404, "Player not Found")
    }

    Object.assign(player, {
      first_name: new_first_name,
      last_name: new_last_name,
      age: new_age,
      birth_date: new_birth_date,
      position: new_position,
      gender: new_gender,
      league: new_league,
      foot: new_foot,
      height: new_height,
      kit: new_kit,
      profile_picture: new_profile_picture,
      weight: new_weight,
      stats: new_stats,
      player_bio: new_player_bio
    })

    const updatedPlayer = await player.save();

    res.status(200).json(updatedPlayer)
    
  } catch (error) {

    next(error)
    
  }
}

export const deletePlayer: RequestHandler = async (req, res, next) => {

  const playerID = req.params.playerId;

  try {

    if(!mongoose.isValidObjectId(playerID)){

      throw createHttpError(400, "Invalid player ID")
    }

    const player = await PlayerModel.findByIdAndDelete(playerID).exec();

    if(!player){
      throw createHttpError(404, "Player not Found")
    }

    res.status(204).json(player)
    
  } catch (error) {

    next(error)
    
  }


}
