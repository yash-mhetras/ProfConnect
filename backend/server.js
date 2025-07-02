import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import postsroutes from './routes/posts.routes.js'
import userroutes from './routes/user.routes.js'

dotenv.config();
const app=express()
app.use(express.urlencoded({ extended: true })); 
app.use(cors());
app.use(express.json());
app.use(userroutes);
app.use(postsroutes);




app.use(express.static("uploads"))
const mongo_url=process.env.MONGO_URL;
const start=async()=>{
    const connectDB= await mongoose.connect(mongo_url);
    app.listen(9000,()=>{
        console.log("server is listening")
    })
}
start();