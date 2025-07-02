import mongoose from "mongoose";
const education=new mongoose.Schema({
    school:{
        type:String,
        default:''
    },
    degree:{
         type:String,
        default:''
    },
    feildOfStudy:{
         type:String,
        default:''
    }
})
const work=new mongoose.Schema({
    company:{
        type:String,
        default:''
    },
    position:{
         type:String,
        default:''
    },
    years:{
         type:String,
        default:''
    }
})

const profile=new mongoose.Schema({
    userid:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    bio:{
        type:String,
        default:''
    },
    currentPost:{
        type:String,
        default:''

    },
    pastWork:{
        type:[work],
        default:[]
    },
    education:{
        type:[education],
        default:[]
    }
})
const Profile=mongoose.model("Profile",profile)
export default Profile;