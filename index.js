import  express  from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from "helmet";
import bodyParser from "body-parser";
import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'
import salesRoutes from './routes/sales.js'
import managementRoutes from './routes/management.js'

// configuration
dotenv.config()
const app=express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

// ROUTES
app.use('/client', clientRoutes)
app.use('/general',generalRoutes)
app.use('/management',managementRoutes)
app.use('/sales',salesRoutes)

//Mongoose database
const PORT=process.env.process||9000
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
}).then(()=>{
    app.listen(PORT,()=>console.log(`Server ${PORT}`))

}).catch((error)=>console.log(`${error} did not connect`))