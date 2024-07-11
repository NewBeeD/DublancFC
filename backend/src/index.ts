import app from '../src/app'
import mongoose from 'mongoose'
import cleanedEnv from '../src/util/validateEnv'




const port = cleanedEnv.PORT


mongoose.connect(cleanedEnv.MONGO_CONNECTION_STRING)
.then(()=>{
  console.log('Database connected');

  app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`);
  })
  
})
.catch(console.error)





