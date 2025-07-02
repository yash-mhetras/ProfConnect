import mongoose from "mongoose";
const comment=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    postid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    body:{
        type:String,
        required:true
    }
})
const Comment=mongoose.model("Comment",comment)
export default Comment;