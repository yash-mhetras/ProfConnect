import mongoose from "mongoose";

const postschema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    },
    body:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt:{
        type:Date,
        default:Date.now

    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    media:{
        type:String,
        default:''
    },
    active:{
        type:Boolean,
        default:true

    },
    fileType:{
        type:String,
        default:''

    },
    cloudinary_id: {
  type: String,
  default: ""
}

})

const Post=mongoose.model("Post",postschema);
export default Post;