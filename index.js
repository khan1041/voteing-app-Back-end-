



import express from 'express'


import conectedDb from './Dtabase/dbconection.js'
import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv'
import cors from 'cors'
import { Route } from 'react-router-dom'
import router from './routes/userroutes.js'
//import { errorMiddleware } from './midelware/errorhandel.js';
import fileUpload from 'express-fileupload'
const app = express()

app.use(express.json())


export default app



app.use(
  cors({
    origin:true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


//app.use("/uplods",express.static("./uplods"))

//import fileUpload from 'express-fileupload'
app.use('/app/auth',router)

const port=8000


app.use(fileUpload({

  useTempFiles:true,
  tempFileDir:"/tmp",
 }))



 dotenv.config()


 cloudinary.config({ 
  cloud_name:process.env.CLOUD_NAME, 
  api_key:process.env. CLOUD_API_KEY, 
  api_secret:process.env.API_SECRET_KEY  // Click 'View API Keys' above to copy your API secret
});

 
//app.use(errorMiddleware)

conectedDb().then(()=>{
  app.listen(port,()=>{
   console.log(`surver is running at port:${port}`)    
  })
})







