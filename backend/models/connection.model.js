import mongoose from "mongoose";
const connection=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    connectionid:{
          type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status_accepted:{
        type:Boolean,
        default:null
    }

})

const Connection=mongoose.model("Connection",connection);
export default Connection;