// import { RequestHandler } from "express";
// import ArticleModel from '../models/article'
// import createHttpError from "http-errors";
// import mongoose from "mongoose";

import Article, { UserArticle } from "../models/article";
import genericController from "./genericController";



// export const getArticles: RequestHandler = async (req, res, next) => {

//   try {  

//     const article = await ArticleModel.find().exec();
//     res.status(200).json(article);
    
//   } catch (error) {
//     next(error);
//   }
// }

// export const getArticle: RequestHandler = async (req, res, next) => {

//   const articleID = req.params.articleId;

//   try {   

//     if(!mongoose.isValidObjectId(articleID)){

//       throw createHttpError(400, "Invalid article ID")
//     }

//     const article = await ArticleModel.findById(articleID).exec();
    
//     if(!article){
//       throw createHttpError(404, "Article not Found")
//     }

//     res.status(200).json(article)
    
//   } catch (error) {

//     next(Error)

//   }
// }

// interface CreateArticle {

//   title: string,
//   content: string,
//   author: string,
//   img?: string
  
// }

// export const addArticle: RequestHandler<unknown, unknown, CreateArticle, unknown> = async (req, res, next) => {

//   const {title, content, author, img} = req.body

//   const requiredFields = [title, content, author];


//   try {

//     if (requiredFields.some(field => !field)) {

//       throw createHttpError(400, "Article is missing a required feature!");
//     }

//     const newArticle = await ArticleModel.create({
//       title: title,
//       content: content,
//       author: author,
//       img: img
//     })

//     res.status(201).json(newArticle)
    
//   } catch (error) {

//     next(error);
    
//   }
// }

// interface UpdateArticle {

//   title: string,
//   content: string,
//   author: string,
//   img?: string
// }

// interface UpdateArticleParams{

//   articleId: string
// }

// export const updateArticle: RequestHandler<UpdateArticleParams, unknown, UpdateArticle, unknown> = async (req, res, next) => {


//   const articleID = req.params.articleId;
  
//   const {title: new_title, content: new_content, author: new_author  ,img: new_img} = req.body

//   const requiredFields = [new_title, new_content, new_author];

//   try {

//     if(!mongoose.isValidObjectId(articleID)){

//       throw createHttpError(400, "Invalid article ID")
//     }

//     if (requiredFields.some(field => !field)) {

//       throw createHttpError(400, "Article is missing a required feature!");
//     }

//     const article = await ArticleModel.findById(articleID).exec(); 

//     if(!article){
//       throw createHttpError(404, "Article not Found")
//     }

//     Object.assign(article, {
//       title: new_title,
//       content: new_content,
//       author: new_author,
//       img: new_img
//     })

//     const updatedArticle = await article.save();

//     res.status(200).json(updatedArticle)
    
//   } catch (error) {

//     next(error)
//   }
// }

// export const deleteArticle: RequestHandler = async (req, res, next) => {

//   const articleID = req.params.articleId;

//   try {

//     if(!mongoose.isValidObjectId(articleID)){

//       throw createHttpError(400, "Invalid article ID")
//     }

//     const article = await ArticleModel.findByIdAndDelete(articleID).exec();

//     if(!article){
//       throw createHttpError(404, "Article not Found")
//     }

//     res.status(204).json(article)
    
//   } catch (error) {

//     next(error)
    
//   }


// }

export const createArticle = genericController.createOne<UserArticle>(Article);
export const getArticle = genericController.getOne<UserArticle>(Article);
export const getAllArticles = genericController.getAll<UserArticle>(Article);
export const updateArticle = genericController.updateOne<UserArticle>(Article);
export const deleteArticle = genericController.deleteOne<UserArticle>(Article);




