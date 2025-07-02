import { createSlice } from "@reduxjs/toolkit";
import { getaboutuser, getallusers, getconnectionrequest, getmyconnectionrequest, loginuser, registerUser } from "../../action/authaction";
const initialState={
    user:undefined,
    isError:false,
    isSuccess:false,
    isLoading:false,
    loggedIn:false,
    message:"",
    istoken:false,
    profileFetched:false,
    connections:[],
    connectionRequest:[],
    all_users:[],
    all_profile_fetched:false
}

const authslice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        reset:()=>initialState,
        handleLoginUser:(state)=>{
            state.message="hello"
        },
        emptyMessage:(state)=>{
            state.message=""
        },
        setistoken:(state)=>{
            state.istoken=true

        },
        setisnottoken:(state)=>{
            state.istoken=false

        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginuser.pending,(state)=>{
            state.isLoading=true;
            state.message="knocking the door...";
        })
        .addCase(loginuser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.loggedIn=true;
            state.message="login successfull";
        })
        .addCase(loginuser.rejected,(state,action)=>{
            state.isLoading==false;
            state.isError=true;
            state.message=action.payload;
        })
        .addCase(registerUser.pending,(state)=>{
            state.isLoading=true;
            state.message="Registering you"
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.message={message:"Registration is successfull! please log in"}
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload
        })
        .addCase(getaboutuser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.profileFetched=true;
            state.user=action.payload;
        })
        .addCase(getallusers.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.all_profile_fetched=true;
            state.all_users=action.payload.profiles;
        })
        .addCase(getconnectionrequest.fulfilled,(state,action)=>{
            state.connections=action.payload
        })
        .addCase(getconnectionrequest.rejected,(state,action)=>{
            state.message=action.payload
        })
          .addCase(getmyconnectionrequest.fulfilled,(state,action)=>{
            state.connectionRequest=action.payload
        })
        .addCase(getmyconnectionrequest.rejected,(state,action)=>{
            state.message=action.payload
        })
    }
})


export const {reset,emptyMessage,setistoken,setisnottoken}=authslice.actions;
export default authslice.reducer;
