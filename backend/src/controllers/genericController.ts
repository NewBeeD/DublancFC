// controllers/genericController.ts

import { Request, Response, RequestHandler, NextFunction } from 'express';
import { Model, Document } from 'mongoose';

import createHttpError from 'http-errors';
import mongoose from 'mongoose';


const getAll = <T extends Document>(Model: Model<T>) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  
  try {

    const docs = await Model.find().exec();
    res.status(200).json(docs);
  } catch (error) {
    next(error)
  }
};

const getOne = <T extends Document>(Model: Model<T>) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const docID = req.params.id;
  
  try {

    if(!mongoose.isValidObjectId(docID)){

      throw createHttpError(400, "Invalid ID")
    }

    const doc = await Model.findById(docID).exec();
    
    if(!doc){
      throw createHttpError(404, "Document not Found")
    }

    res.status(200).json(doc); 
  } catch (error) {
    next(error)
  }
};

const createOne = <T extends Document>(Model: Model<T>) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  
  try {
    const doc = await Model.create(req.body);    

    res.status(201).json(doc);

  } catch (error) {
    next(error)
  }
};


const updateOne = <T extends Document>(Model: Model<T>) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {


  try {

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if(!doc){
      throw createHttpError(404, "Document not Found")
    }

    res.status(200).json(doc);

  } catch (error) {
    
    next(error)
  }
};

const deleteOne = <T extends Document>(Model: Model<T>) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const docID = req.params.id;
  
  try {

    if(!mongoose.isValidObjectId(docID)){

      throw createHttpError(400, "Invalid document ID")
    }

    const doc = await Model.findByIdAndDelete(docID).exec();
    
    if(!doc){
      throw createHttpError(404, "Document not Found")
    }

    res.status(204).json(doc)
    
  } catch (error) {

    next(error)
  }
};

export default {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
};
