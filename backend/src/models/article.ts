import { model, Schema, Document } from "mongoose";


export interface UserArticle extends Document {

  title: string,
  content: string,
  author: string,
  img?: string

}

const ArticleSchema = new Schema({

  title: {type: String, required: [true, "Article must have a title"]},
  content: {type: String, required: [true, "Article must have content"]},
  author: {type: Date, required: [true, "Article must have an author"]},
  img: {type: String}

}, {timestamps: true})

const Article = model<UserArticle>('Article', ArticleSchema)

export default Article;