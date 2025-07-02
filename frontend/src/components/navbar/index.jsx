import React from 'react'
import styles from './styles.module.css'
import {  useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '@/config/redux/reducer/authreducer';

export default function Navbar() {
    const authstate=useSelector((state)=>state.auth)
    const router=useRouter();
    const dispatch=useDispatch();
  return (
    <div className={styles.container}>
        <nav className={styles.navbar}>
            <h2 onClick={()=>{router.push("/")}}>ProfConnect</h2>
            <div className={styles.navbaroption}>
                {authstate.profileFetched&&    <div style={{display:"flex",gap:"1.2rem"}}>
                
                    <p onClick={()=>{router.push('/profile')}} style={{fontWeight:"bold",cursor:"pointer"}}>Profile</p>
                    <p onClick={()=>{localStorage.removeItem('token'); router.push('/login'); dispatch(reset())}} style={{fontWeight:"bold",cursor:"pointer"}}>Logout</p>
                   
                </div>}
            
                {!authstate.profileFetched &&  <div onClick={()=>{router.push("/login")}} className={styles.buttonjoin}>
                    <p >Be a part</p>
                </div>}
               
            </div>
        </nav>
      

    </div>
  )
}
