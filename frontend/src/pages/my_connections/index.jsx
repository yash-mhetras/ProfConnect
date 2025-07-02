import { acceptconnectionrequest, getconnectionrequest, getmyconnectionrequest } from '@/config/redux/action/authaction';
import Dashboardlayout from '@/layouts/dashboardlayout'
import Userlayout from '@/layouts/userlayouts'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.css'
import { BASEURL } from '@/config';
import { useRouter } from 'next/router';

export default function Myconnection() {

    const dispatch=useDispatch();
    const authstate=useSelector((state)=>state.auth);
    const router=useRouter();

    useEffect(()=>{
        dispatch(getmyconnectionrequest({token:localStorage.getItem('token')}));
       dispatch(getconnectionrequest({token:localStorage.getItem('token')}))
    },[])
    useEffect(()=>{
        if(authstate.connectionRequest.length !=0){
            console.log(authstate.connectionRequest);
        
        }
    },[authstate.connectionRequest])
  return (
       <Userlayout>
            <Dashboardlayout>
             
                <div className={styles.myconnections}>
                <h3>Connection Request</h3>
              
                   
                    {
                        authstate.connectionRequest.length!=0 && authstate.connectionRequest.filter((connection)=>connection.status_accepted===null).map((user,index)=>{
                            return(
                                <div onClick={()=>{
                                    router.push(`viewprofile/${user.userid.username}`)
                                }} className={styles.usercard} key={index}>
                                    <div style={{display:"flex",alignItems:"center",gap:"1.3rem"}}>
                                        <div className={styles.profilepicture}>
                                            <img  src={`${BASEURL}/${user.userid.profilePicture}`} alt="" />

                                        </div>
                                        <div className={styles.userinfo}>
                                            <h3>{user.userid.name}</h3>
                                            <p>@{user.userid.username}</p>

                                        </div>
                                        <button onClick={(e)=>{e.stopPropagation(); dispatch(acceptconnectionrequest({
                                            connectionid:user._id,
                                            token:localStorage.getItem('token'),
                                            action:"accept"

                                        }))}}className={styles.connectedbtn}>Accept</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <h3>My Network</h3>
                    {authstate.connectionRequest.filter((connection)=>connection.status_accepted!==null).map((user,index)=>{
                        return(
                                     <div onClick={()=>{
                                    router.push(`viewprofile/${user.userid.username}`)
                                }} className={styles.usercard} key={index}>
                                    <div style={{display:"flex",alignItems:"center",gap:"1.3rem"}}>
                                        <div className={styles.profilepicture}>
                                            <img  src={`${BASEURL}/${user.userid.profilePicture}`} alt="" />

                                        </div>
                                        <div className={styles.userinfo}>
                                            <h3>{user.userid.name}</h3>
                                            <p>@{user.userid.username}</p>

                                        </div>
                                     
                                    </div>
                                </div>
                        )
                       

                    })}
                    {authstate.connections.filter((connection)=>connection.status_accepted!==null).map((user,index)=>{
                        return(
                                     <div onClick={()=>{
                                    router.push(`viewprofile/${user.connectionid.username}`)
                                }} className={styles.usercard} key={index}>
                                    <div style={{display:"flex",alignItems:"center",gap:"1.3rem"}}>
                                        <div className={styles.profilepicture}>
                                            <img  src={`${BASEURL}/${user.connectionid.profilePicture}`} alt="" />

                                        </div>
                                        <div className={styles.userinfo}>
                                            <h3>{user.connectionid.name}</h3>
                                            <p>@{user.connectionid.username}</p>

                                        </div>
                                     
                                    </div>
                                </div>
                        )
                       

                    })}
                </div>
              
            </Dashboardlayout>
         
       
        </Userlayout>
    
  )
}
