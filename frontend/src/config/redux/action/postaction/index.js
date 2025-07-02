import { clientserver } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getallposts=createAsyncThunk(
    "post/getallposts",
    async(_,thunkAPI)=>{
        try{
            const response=await clientserver.get('/posts');
            return thunkAPI.fulfillWithValue(response.data.posts);

        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)
export const createpost=createAsyncThunk(
    "post/createpost",
    async (userdata,thunkAPI)=>{
        const {file,body}=userdata;
        try{
            const formdata=new FormData();
            formdata.append('token',localStorage.getItem('token'));
            formdata.append('body',body);
            formdata.append('media',file);
            const response=await clientserver.post("/post",formdata,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });
            if(response.status===200){
                return thunkAPI.fulfillWithValue(response.data);
            }
            else{
                thunkAPI.rejectWithValue("post not uploaded")
            }

        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data)

        }
    }
)
export const deletepost=createAsyncThunk(
    "post/deletepost",
    async(postid,thunkAPI)=>{
        try{
            const response=await clientserver.delete("/delete_post",{
               data:{
                token:localStorage.getItem('token'),
                postid:postid
               }
            })
            return thunkAPI.fulfillWithValue(response.data);
          
        }
        catch(error){
             return thunkAPI.rejectWithValue(error.response.data)


        }
    }
)

export const incrementpostlikes=createAsyncThunk(
    "/post/incrementlike",
    
    async(post,thunkAPI)=>{
        try{
        const response=await clientserver.post("/increment_likes",{
            token:localStorage.getItem('token'),
            postid:post.postid
        })
        return thunkAPI.fulfillWithValue(response.data);
    }
        catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message)

}
    }

)

export const getallcomments=createAsyncThunk(
    "post/getallcomments",
    async(postdata,thunkAPI)=>{
        try{
            const response=await clientserver.get("/get_comments",
                {
                    params:{
                        postid:postdata.postid
                    }
                }
            )
            return thunkAPI.fulfillWithValue({comments:response.data,
                postid:postdata.postid
            })

        }catch(error){
             return thunkAPI.rejectWithValue(error.response.data.message)


        }
    }

)

export const postcomment=createAsyncThunk(
    "post/postcomment",
    async(commentdata,thunkAPI)=>{
        try{
            console.log({
                postid:commentdata.postid,
                body:commentdata.body
,
            })
            const response=await clientserver.post("/comment",{
                token:localStorage.getItem('token'),
                    postid:commentdata.postid,
                    commentbody:commentdata.body


                
            })
            return thunkAPI.fulfillWithValue(response.data)
        }catch(error){
             return thunkAPI.rejectWithValue(error.response.data.message)


        }
    }
)