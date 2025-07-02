import Userlayout from '@/layouts/userlayouts'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./style.module.css"
import { loginuser, registerUser } from '@/config/redux/action/authaction';
import { emptyMessage } from '@/config/redux/reducer/authreducer';

export default function Logincomponent() {
    const authstate=useSelector((state)=>state.auth);
    const router=useRouter();

    const dispatch=useDispatch();
    const [loginmethod,setloginmethod]=useState(false);
    const[username,setusername]=useState("");
    const[name,setname]=useState("");
    const[password,setpassword]=useState("");
    const[email,setemail]=useState("");
    useEffect(()=>{
        if(authstate.loggedIn){
            router.push("/dashboard");
        }
    },[authstate.loggedIn]

    )

    useEffect(()=>{
        dispatch(emptyMessage());
    },[loginmethod])
    useEffect(()=>{
        if(localStorage.getItem("token")){
            router.push("/dashboard")
        }
    })

    const handleRegister=()=>{
        console.log("registering");
        dispatch(registerUser({username,password,email,name}))
          .then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setloginmethod(true); // ✅ switch to login form
      }
    });
}
    const handleLogin=()=>{
        dispatch(loginuser({email,password}));

    }
       

    
  return (
    <Userlayout>
        <div className={styles.container}>
        <div className={styles.card}>
            <div className={styles.cardleft}>
                
                 <p className={styles.cardleftheading}>{loginmethod?"sign In":"Sign Up"}</p>
                 <p style={{color:authstate.isError?"red":"green"}}>{authstate.message.message}</p>
                <div className={styles.inputcontainer}>

                    {!loginmethod ?<><input type="text" onChange={(e)=>{setusername(e.target.value)}} className={styles.inputfeild} placeholder='Username'/>
                        <input type="text" onChange={(e)=>{setname(e.target.value)}} className={styles.inputfeild} placeholder='Name'/></>:<></> }
                                       
                     <input type="text" onChange={(e)=>{setemail(e.target.value)}} className={styles.inputfeild} placeholder='Email'/>
                      <input type="text" onChange={(e)=>{setpassword(e.target.value)}} className={styles.inputfeild} placeholder='Password'/>
                      <div className={styles.buttondiv} onClick={()=>{
                        if(loginmethod){
                            handleLogin();

                        }else{
                            handleRegister();
                        }
                      }}>
                        <p>{loginmethod?"sign In":"Sign Up"}</p>
                      </div>
                </div>
                
                
            </div>
            <div className={styles.cardright}>
                <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
                {loginmethod?<p>Dont't have an account?</p>:<p>Already have an account?</p>}
                <div style={{textAlign:"center"}}className={styles.buttondiv} onClick={()=>setloginmethod(!loginmethod)}>
                      
                     
                        <p>{loginmethod?"sign Up":"Sign In"}</p>
                      </div>
                      </div>

            </div>
        </div>
        </div>
      
    </Userlayout>
  
  )
}
