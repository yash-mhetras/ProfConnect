import Post from "../models/posts.model.js";
import User from "../models/user.model.js";
import Comment from "../models/comments.model.js";
import { v2 as cloudinary } from 'cloudinary';

export const activeCheck=async(req,res)=>{
    res.status(200).json({message:"Running"});

}

export const createpost=async(req,res)=>{
   
           const {token}=req.body;
             console.log(" POST BODY:", req.body);
  console.log(" FILE INFO:", req.file);
            try{
                    const user=await User.findOne({token:token});
                if(!user)  {
                    return res.status(404).json({message:"user Not Found"});
                }
                const post=new Post(
                    {
                        userid:user._id,
                        body:req.body.body,
                        media: req.file ? req.file.path.split("/").pop() : "",
                        fileType:req.file != undefined?req.file.mimetype.split("/")[1]:"",
                        cloudinary_id: req.file ? req.file.filename : ""
                    }
                )
                await post.save();
                return res.status(200).json({message:"post created"})

    }catch(error){
           return res.status(500).json({message:error.message});


    }

}
export const getallposts=async(req,res)=>
{
    try{
        const posts=await Post.find().populate('userid','name email username profilePicture');
        return res.json({posts});

    }catch(error){
        return res.status(500).json({message:error.message});

    }
}
export const deletepost=async(req,res)=>{
    const {token,postid}=req.body;
    try{
        const user=await User.findOne({token:token}).select("_id");
         if(!user) return res.status(404).json({message:"User not found"});

         const post=await Post.findOne({_id:postid});
         if(!post){
        
            return res.status(404).json({message:"post not found"});

         }
         if(post.userid.toString()!== user._id.toString()){
            return res.status(401).json({message:"unauthorized"});

         }
            if (post.cloudinary_id) {
            await cloudinary.uploader.destroy(post.cloudinary_id);
            }
         await post.deleteOne(); 
         return res.json({message:"post deleted"})


    }catch(error){
         return res.status(500).json({message:error.message});


    }
}

export const get_comment_by_post=async(req,res)=>{
    const {postid}=req.query;
    try{
        const post=Post.findOne({_id:postid});
        if(!post){
             return res.status(404).json({message:"post Not Found"});


        }
        const comments=await Comment.find({postid:postid}).populate('userid','username name')
        
        return res.json(comments.reverse());



    }catch(error){
         return res.status(500).json({message:error.message});

    }
}

export const deletecomment=async(req,res)=>{
    const {token,commentid}=req.body;
    try{
        const user=await User.findOne({token:token}).select("_id");
        if(!user){
            return res.status(404).json({message:"user Not Found"});

        }
        const comment=await Comment.findOne({_id:commentid});
        if(!comment){
              return res.status(404).json({message:"comment Not Found"});

        }
        if(comment.userid.toString()!== user._id.toString()){
             return res.status(401).json({message:"unauthorized"});

        }
        await Comment.deleteOne({"_id":commentid});
        return res.json({message:"comment deleted"})

    }catch(error){
         return res.status(500).json({message:error.message});


    }
}


export const incrementlikes= async (req,res)=>{
    const{postid,token}=req.body;
    try{
         const user = await User.findOne({ token:token }).select("_id");
    if (!user) return res.status(404).json({ message: "User not found" });
        const post=await Post.findOne({_id:postid});
        if(!post){
             return res.status(404).json({message:"post Not Found"});


        }
           if (post.likedBy.includes(user._id)) {
      return res.status(400).json({ message: "You already liked this post" });
    }
        post.likes=post.likes+1;
        post.likedBy.push(user._id);
        await post.save();
        return res.json({message:"likes incremented"});        



    }catch(error){
          return res.status(500).json({message:error.message});

        


    }

}