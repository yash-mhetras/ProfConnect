import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import Connection from "../models/connection.model.js";
import Post from "../models/posts.model.js";
import Comment from "../models/comments.model.js";

const converttopdf= async(userData)=>{
    const doc=new PDFDocument();
    const outputpath=crypto.randomBytes(32).toString("hex")+".pdf";
    const stream=fs.createWriteStream("uploads/"+outputpath);
    doc.pipe(stream);
    doc.image(`uploads/${userData.userid.profilePicture}`,{align:"center",width:100});
    doc.fontSize(14).text(`Name: ${userData.userid.name}`);
    doc.fontSize(14).text(`Username: ${userData.userid.username}`);
    doc.fontSize(14).text(`Email: ${userData.userid.email}`);
    doc.fontSize(14).text(`Bio: ${userData.bio}`);
  
    doc.fontSize(14).text("Past Work: ")
    userData.pastWork.forEach((work,index)=>{
        doc.fontSize(14).text(`Company name: ${work.company}`);
        doc.fontSize(14).text(`Position: ${work.position}`);
        doc.fontSize(14).text(`Years: ${work.years}`);
    })
    doc.fontSize(14).text("Education: ")
    userData.education.forEach((education,index)=>{
        doc.fontSize(14).text(`School/College: ${education.school}`);
        doc.fontSize(14).text(`Degree: ${education.degree}`);
        doc.fontSize(14).text(`Feild of Study: ${education.feildOfStudy}`);
    })
    doc.end();
    return outputpath;

    
}


export const register=async(req,res)=>{
    try{
        const {name,email,password,username}=req.body;

        if(!name || !email||!password||!username) return res.status(400).json({message:"All feilds are required"});

        const user =await User.findOne({email:email});

        if(user) return res.status(400).json({message:"user already exist"});
        const hashedpassword=await bcrypt.hash(password,10);
        const newUser=new User({
            name:name,
            email:email,
            password:hashedpassword,
            username:username
        })
        await newUser.save();
        const profile=new Profile({userid:newUser._id});
        await profile.save();
        return res.json({message:"User registered successfully"});


    }catch(error){
        return res.status(500).json({message:error.message})
    }
}
export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password) return res.status(400).json({message:"All feilds are required"});
        const currentUser=await User.findOne({email:email});
        if(!currentUser) return res.status(404).json({message:"user Not Found"});
        const ismatch=await bcrypt.compare(password,currentUser.password);
        if(!ismatch)  return res.status(400).json({message:"invalid credentials"});
        const token = crypto.randomBytes(32).toString("hex");
        await User.updateOne({_id:currentUser._id},{token});
        return res.json({token:token});


    }catch(error){
         return res.status(500).json({message:error.message});


    }
}
export const uploadprofilepicture=async(req,res)=>{
    const {token}=req.body;
    try{
        const user=await User.findOne({token:token});
        if(!user)  {
            return res.status(404).json({message:"user Not Found"});
        }
        user.profilePicture=req.file.filename;
        await user.save();
        return res.json({message:'profile picture updated'});

    }catch(error){
        return res.status(500).json({message:error.message});

    }
}

export const updateuserprofile=async(req,res)=>{
    try{
        const {token, ...newUserData}=req.body;
        const user=await User.findOne({token:token});
        
          if(!user)  {
            return res.status(404).json({message:"user Not Found"});
        }
        const {username,email}=newUserData;
        const existinguser=await User.findOne({$or:[{username},{email}]});
        if(existinguser){
            if(existinguser || String(existinguser._id)!== String(user._id)){
            return res.status(400).json({message:"user already exist"});
            }
        }
        Object.assign(user,newUserData);
        await user.save();
        


    }catch(error){
         return res.status(500).json({message:error.message});


    }
}
export const getuserandprofile=async(req,res)=>{
     const {token}=req.query;
    try{
            const user=await User.findOne({token:token});
        if(!user)  {
            return res.status(404).json({message:"user Not Found"});
        }
        const userprofile=await Profile.findOne({userid:user._id})
        .populate('userid','name email username profilePicture');

        return res.json(userprofile);

    }catch(error){
         return res.status(500).json({message:error.message});

    }
}
export const updateprofile=async(req,res)=>{
    try{
        const {token, ...neweProfileData}=req.body;
        const userprofile=await User.findOne({token:token});
         
        if(!userprofile){
             return res.status(404).json({message:"user Not Found"});

        }
        const profile_to_update=await Profile.findOne({userid:userprofile._id});
        Object.assign(profile_to_update,neweProfileData);
        await profile_to_update.save();
       


    }catch(error){
        return res.status(500).json({message:error.message});


    }
}

export const getalluserprofile=async(req,res)=>{
    const token=req.query.token;
     
    try{
        const user=await User.findOne({token:token});
        if(!user)  {
            return res.status(404).json({message:"user Not Found"});
        }
        
        const profiles=await Profile.find({ userid: { $ne: user._id } }).populate('userid','name email username profilePicture');
        return res.json({profiles})

    }catch(error){
          return res.status(500).json({message:error.message});


    }
}

export const downloadprofile=async(req,res)=>{
    const user_id=req.query.id;
    const userprofile=await Profile.findOne({userid:user_id}).populate('userid','name email username profilePicture');
    let outputpath= await converttopdf(userprofile);
    return res.json({"message":outputpath})

}
export const sendconnetcionrequest=async(req,res)=>{
    const {token,connectionid}=req.body;
     try{
        console.log(connectionid);
        const user=await User.findOne({token:token});
        if(!user)  {
            return res.status(404).json({message:"user Not Found"});
        }
  

        const existingrequest=await Connection.findOne({
            userid:user._id,
            connectionid:connectionid
        })
        if(existingrequest){
            return res.status(404).json({message:"Request already sent"});
           
        }
       
        const request=new Connection({
            userid:user._id,
            connectionid:connectionid
        });
        await request.save();
        return res.json({message:"request sent"})

        

        
    }catch(error){
          return res.status(500).json({message:error.message});


    }

}
export const getconnectionrequest=async(req,res)=>{
    const {token}=req.query;
    try{
         const user=await User.findOne({token:token});
        if(!user)  {
            return res.status(404).json({message:"connection Not Found"});
        }
        const connection=await Connection.find({userid:user._id}).populate('connectionid','name username email profilePicture');
        return res.json({connections:connection});

    
    }
    catch(error){
          return res.status(500).json({message:error.message});


    }
}

export const whataremyconnections=async(req,res)=>{
     const {token}=req.query;
    try{
        const user=await User.findOne({token:token});
        if(!user) {
            return res.status(404).json({message:"connection Not Found"});
        }  
        const connections=await Connection.find({connectionid:user._id}).populate('userid','name username email profilePicture');
        return res.json(connections);

    }catch(error){
         return res.status(500).json({message:error.message});

    }
}

export const acceptconnection=async(req,res)=>{
     const {token,requestid,action_type}=req.body;
     try{
        const user=await User.findOne({token:token});
        if(!user) {
            return res.status(404).json({message:"user Not Found"});
        }  
        const connection=await Connection.findOne({_id:requestid});
        if(!connection){
            return res.status(404).json({message:"connection Not Found"});


        }
        if(action_type==="accept"){
            connection.status_accepted=true
        }
        else{
            connection.status_accepted=false;
        }

        await connection.save();
        return res.json({message:"request updated"})
          }catch(error){
         return res.status(500).json({message:error.message});

    }

}

export const commentpost=async(req,res)=>{
    const{token,postid,commentbody}=req.body;
    try{
        const user=await User.findOne({token:token}).select("_id");
        if(!user) {
            return res.status(404).json({message:"user Not Found"});
        }  
        const post=await Post.findOne({
            _id:postid
        })
        if(!post){
             return res.status(404).json({message:"post Not Found"});

        }
        const comment=new Comment({
            userid:user._id,
            postid:postid,
            body:commentbody
        })
        await comment.save();
        return res.json({message:"comment added"});

    }catch(error){
         return res.status(500).json({message:error.message});

    }
}

export const getuserandprofilebasedonusername=async(req,res)=>{
    const {username}=req.query;
    try{
        const user=await User.findOne({
            username:username
        })
        if(!user){
            return res.status(404).json({message:"User Not Found"});


        }
        const userprofile=await Profile.findOne({userid:user._id}).populate('userid','name username email profilePicture')
        return res.json({"profile":userprofile});
    }catch(error){
         return res.status(500).json({message:error.message});

    }
}

