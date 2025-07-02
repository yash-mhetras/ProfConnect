import { clientserver } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const loginuser=createAsyncThunk(
    "user/login",
    async (user,thunkAPI)=>{
        try{

            const response=await clientserver.post('/login',{
                email:user.email,
                password:user.password
            })
            if(response.data.token){
                localStorage.setItem("token",response.data.token);

            }
            else{
                return thunkAPI.rejectWithValue({message:"token not found"});

            }

            return thunkAPI.fulfillWithValue(response.data.token);
            
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const registerUser=createAsyncThunk(
    "user/register",
    async (user,thunkAPI)=>{

        try{
            const request=await clientserver.post("/register",{
                username:user.username,
                password:user.password,
                email:user.email,
                name:user.name
            })

        }catch(error){
             return thunkAPI.rejectWithValue(error.response.data);

        }
    }
)

export const getaboutuser=createAsyncThunk(
    "user/getaboutuser",
    async(user,thunkAPI)=>{
        try{
            console.log(user)
            const response=await clientserver.get("/get_user_and_profile",{
                params:{
                    token:user.token
                }
            
        })
        return thunkAPI.fulfillWithValue(response.data);
        }
          catch(error){
             return thunkAPI.rejectWithValue(error.response.data);
            
        }

        
    }
)

export const getallusers=createAsyncThunk(
    "user/getallusers",
    async(user,thunkAPI)=>{
        try{

            const response=await clientserver.get("/user/get_alluser_profile",{
                params:{
                    token:user.token
                }
             
            });
            return thunkAPI.fulfillWithValue(response.data);

        }catch(error){
             return thunkAPI.rejectWithValue(error.response.data);

        }
    }
)

export const send_connectionrequest=createAsyncThunk(
    "user/sendconnectionrequest",
    async(user,thunkAPI)=>{
      
        try{
            console.log("🔍 Axios POST to:", clientserver.defaults.baseURL + "/user/send_connection_request");
            const response=await clientserver.post("/user/send_connection_request",{
                token:user.token,
                connectionid:user.connectionid
            }
            
        );
        thunkAPI.dispatch(getconnectionrequest({token:user.token}))
         return thunkAPI.fulfillWithValue(response.data);

           

        }catch(error){
             console.error("SEND CONNECTION ERROR:", error);
      return thunkAPI.rejectWithValue(error?.response?.data || { message: "Something went wrong" });

        }
    }
)

export const getconnectionrequest=createAsyncThunk(
    "user/getconnectionrequest",
    async(user,thunkAPI)=>{
      
        try{
            const response=await clientserver.get("/user/get_connection_request",{
                params:{token:user.token}
                
            })
            return thunkAPI.fulfillWithValue(response.data.connections)

        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data);

        }
    }
)
export const getmyconnectionrequest=createAsyncThunk(
    "user/getmyconnectionrequest",
    async(user,thunkAPI)=>{
      
        try{
            const response=await clientserver.get("/user/user_connection_request",{
                params:{token:user.token}
                
            })
            return thunkAPI.fulfillWithValue(response.data)

        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data);

        }
    }
)
export const acceptconnectionrequest=createAsyncThunk(
    "user/acceptconnectionrequest",
    async(user,thunkAPI)=>{
      
        try{
            const response=await clientserver.post("/user/update_connection_request",{
                token:user.token,
                requestid:user.connectionid,
                action_type:user.action
            })
            thunkAPI.dispatch(getconnectionrequest({token:user.token}));
            thunkAPI.dispatch(getmyconnectionrequest({token:user.token}));
            return thunkAPI.fulfillWithValue(response.data)

        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data);

        }
    }
)