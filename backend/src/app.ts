import "dotenv/config"
import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import createHttpError, { isHttpError } from "http-errors"


import playerRoute from './routes/playerRoute'
import staffRoute from './routes/staffRoute'
import fixtureRoute from './routes/fixtureRoute'
import articleRoute from './routes/articleRoute'




const app = express()

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

// Routes
app.use("/api/players", playerRoute)
app.use("/api/staff", staffRoute)
app.use("/api/fixture", fixtureRoute)
app.use("/api/article", articleRoute)


app.use((req, res, next) => {

  next(createHttpError(404, "End point not found"))
})

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {

  let errorMessage = "An unknown error message occured";
  let statusCode = 500;

  if(isHttpError(error)){
    statusCode = error.status
    errorMessage = error.message
  }
  res.status(statusCode).json({error: errorMessage})

})

export default app;