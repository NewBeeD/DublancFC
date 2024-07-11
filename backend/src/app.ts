import "dotenv/config"
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'




const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(cors())

app.use((req, res, next) => {

  console.log(req.path, req.method);
  next()
})


app.get("/", (req, res) => {

  res.send('Hello from the other side')
})

app.post('/', (req, res)=>{

  res.send({
    data: req.body
  })
})


export default app;