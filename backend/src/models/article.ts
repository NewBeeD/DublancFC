import { model, Schema, Document } from "mongoose";


export interface UserArticle extends Document {

  title: string,
  content: string,
  author: string,
  category: string,
  headline: boolean,
  video: string,
  img?: string

}

const ArticleSchema = new Schema({

  title: {type: String, required: [true, "Article must have a title"]},
  content: {type: String, required: [true, "Article must have content"]},
  author: {type: Date, required: [true, "Article must have an author"]},
  category: {type: Date, required: [true, "Article must have a category"]},
  headline: {type: Boolean, default: false},
  video: {type: String},
  img: {type: String}

}, {timestamps: true})

const Article = model<UserArticle>('Article', ArticleSchema)

export default Article;