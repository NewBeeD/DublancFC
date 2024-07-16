import { RequestHandler } from "express";
import StaffModel from '../models/staff'
import createHttpError from "http-errors";
import mongoose from "mongoose";



export const getStaffMembers: RequestHandler = async (req, res, next) => {

  try {  

    const staff = await StaffModel.find().exec();
    res.status(200).json(staff);
    
  } catch (error) {
    next(error);
  }
}

export const getSingleStaff: RequestHandler = async (req, res, next) => {

  const staffID = req.params.staffId;

  try {   

    if(!mongoose.isValidObjectId(staffID)){

      throw createHttpError(400, "Invalid staff ID")
    }

    const staff = await StaffModel.findById(staffID).exec();
    
    if(!staff){
      throw createHttpError(404, "Staff not Found")
    }

    res.status(200).json(staff)
    
  } catch (error) {

    next(Error)

  }
}

interface CreateStaff {

  first_name: string,
  last_name: string,
  role: string,
  profile_picture?: string,
  bio?: string

}

export const addStaff: RequestHandler<unknown, unknown, CreateStaff, unknown> = async (req, res, next) => {

  const {first_name, last_name, role, profile_picture, bio} = req.body

  const requiredFields = [first_name, last_name, role];


  try {

    if (requiredFields.some(field => !field)) {

      throw createHttpError(400, "Staff is missing a required feature!");
    }

    const newStaff = await StaffModel.create({
      first_name: first_name,
      last_name: last_name,
      role: role,      
      profile_picture: profile_picture,
      bio: bio
    })

    res.status(201).json(newStaff)
    
  } catch (error) {

    next(error);
    
  }
}

interface UpdateStaff {

  first_name: string,
  last_name: string,
  role: string,
  profile_picture?: string,
  bio?: string
}

interface UpdateStaffParams{

  staffId: string
}



export const updateStaff: RequestHandler<UpdateStaffParams, unknown, UpdateStaff, unknown> = async (req, res, next) => {


  const staffID = req.params.staffId;
  
  const {first_name: new_first_name, last_name: new_last_name, role: new_role  ,profile_picture: new_profile_picture, bio: new_bio} = req.body

  const requiredFields = [new_first_name, new_last_name, new_role];

  try {

    if(!mongoose.isValidObjectId(staffID)){

      throw createHttpError(400, "Invalid staff ID")
    }

    if (requiredFields.some(field => !field)) {

      throw createHttpError(400, "Staff is missing a required feature!");
    }

    const staff = await StaffModel.findById(staffID).exec(); 

    if(!staff){
      throw createHttpError(404, "Staff not Found")
    }

    Object.assign(staff, {
      first_name: new_first_name,
      last_name: new_last_name,
      role: new_role,
      profile_picture: new_profile_picture,
      bio: new_bio
    })

    const updatedStaff = await staff.save();

    res.status(200).json(updatedStaff)
    
  } catch (error) {

    next(error)
    
  }
}

export const deleteStaff: RequestHandler = async (req, res, next) => {

  const staffID = req.params.staffId;

  try {

    if(!mongoose.isValidObjectId(staffID)){

      throw createHttpError(400, "Invalid staff ID")
    }

    const staff = await StaffModel.findByIdAndDelete(staffID).exec();

    if(!staff){
      throw createHttpError(404, "Staff not Found")
    }

    res.status(204).json(staff)
    
  } catch (error) {

    next(error)
    
  }


}
