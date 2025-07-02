import { createSlice } from "@reduxjs/toolkit"
import { getallcomments, getallposts } from "../../action/postaction"

const initialState={
    posts:[],
    isError:false,
    postFetched:false,
    isLoading:false,
    loggedIn:false,
    message:"",
    comments:[],
    postid:""

}

const postslice=createSlice({
    name:"post",
    initialState,
    reducers:{
        reset:()=>initialState,
        resetpostid:(state)=>{
            state.postid=""
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getallposts.pending,(state)=>{
            state.isLoading=true;
            state.message="Fetching all posts...";
        })
        .addCase(getallposts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.postFetched=true;
            state.posts=action.payload.reverse();
        })
        .addCase(getallposts.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload;

        })
        .addCase(getallcomments.fulfilled,(state,action)=>{
            state.postid=action.payload.postid;
            state.comments=action.payload.comments;
        })

    }
})
export const{resetpostid}=postslice.actions;
export default postslice.reducer;