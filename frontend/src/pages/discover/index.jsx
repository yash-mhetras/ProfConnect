import { BASEURL } from '@/config';
import { getallusers } from '@/config/redux/action/authaction';
import Dashboardlayout from '@/layouts/dashboardlayout'
import Userlayout from '@/layouts/userlayouts'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.css'
import { useRouter } from 'next/router';

export default function Discover() {
    const router=useRouter();
    const authstate=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    useEffect(()=>{
        if(!authstate.all_profile_fetched){
            dispatch(getallusers({token:localStorage.getItem('token')}));
        }
    },[])
  
  return (
       <Userlayout>
            <Dashboardlayout>
                <div>
                    <h1 >Discover</h1>
                    <div className={styles.alluserprofile}>
                        {authstate.all_profile_fetched && authstate.all_users.map((user)=>{
                            return (
                                <div key={user._id} className={styles.usercard} onClick={()=>{
                                    router.push(`/viewprofile/${user.userid.username}`)
                                }}>
                                    <img className={styles.usercardimage} src={`${BASEURL}/${user.userid.profilePicture}`} alt="" />
                                    <div>
                                        <h2>{user.userid.name}</h2>
                                    <p style={{color:"gray"}}>@{user.userid.username}</p>
                                    </div>
                                    

                                </div>
                            )
                        })}


                    </div>
                </div>
            </Dashboardlayout>
         
       
        </Userlayout>
  )
}
