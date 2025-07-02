import { BASEURL, clientserver } from '@/config';
import Dashboardlayout from '@/layouts/dashboardlayout';
import Userlayout from '@/layouts/userlayouts';
import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getallposts } from '@/config/redux/action/postaction';
import { getconnectionrequest, getmyconnectionrequest, send_connectionrequest  } from '@/config/redux/action/authaction';

export default function Viewprofile({userprofile}) {

  const router=useRouter();
  const dispatch=useDispatch();
  const postreducer=useSelector((state)=>state.posts);
  const authstate=useSelector((state)=>state.auth);
  const [userpost,setuserpost]=useState([]);
  const[iscurrentuser,setiscurrentuser]=useState(false);
  const[isconnectionnull,setisconnectionnull]=useState(true);
  const getuserpost=async()=>{
    await dispatch(getallposts());
    await dispatch(getconnectionrequest({token:localStorage.getItem('token')}));
    await dispatch(getmyconnectionrequest({token:localStorage.getItem('token')}))
    
  }
  useEffect(()=>{
    let post=postreducer.posts.filter((post)=>{
      return post.userid.username===router.query.username
    })
    setuserpost(post);
  },[postreducer.posts])

useEffect(() => {
  console.log(authstate.connections,userprofile.userid._id);
 if (

  authstate.connections.some(user => user.connectionid && user.connectionid._id === userprofile.userid._id)
) {
  setiscurrentuser(true);
  if(authstate.connections.find(user=>user.connectionid && user.connectionid._id===userprofile.userid._id).status_accepted===true){
    setisconnectionnull(false);
  }
}
  if (

  authstate.connectionRequest.some(user =>user.userid._id === userprofile.userid._id)
) {
  setiscurrentuser(true);
  if(authstate.connectionRequest.find( user=> user.userid &&user.userid._id===userprofile.userid._id).status_accepted===true){
    setisconnectionnull(false);
  }
} 
  

}, [authstate.connections,authstate.connectionRequest] );


useEffect(()=>{
  getuserpost();
},[])
useEffect(() => {
  console.log("Authstate:", authstate);
}, [authstate]);



  return (
    <Userlayout>
      <Dashboardlayout>
        <div className={styles.container}>
          <div className={styles.backdropcontainer}>
                <img className={styles.backdropprofile} src={`${BASEURL}/${userprofile.userid.profilePicture}`} alt="" />
             
          </div>
             <div className={styles.profiledetails} >
                  <div className={styles.profileflex}>
                    <div style={{flex:"0.8"}}>

                      <div style={{ display: "flex", width: "fit-content", alignItems: "center", gap: "1.2rem" }}>
                      <h2>{userprofile.userid.name}</h2>
                      <p style={{ color: "grey" }}>@{userprofile.userid.username}</p>
                    </div>
                    <div style={{display:"flex", alignItems:"center",gap:"1.2rem"}}>
                    {iscurrentuser? <button className={styles.connectedbtn}>{isconnectionnull?"Pending":"connected"}</button>:<button onClick={()=>{dispatch(send_connectionrequest({token:localStorage.getItem('token'),connectionid:userprofile.userid._id})) }} className={styles.connectbtn}>Connect</button>}
                          <div onClick={async()=>{
                            const response=await clientserver.get(`/user/download_resume?id=${userprofile.userid._id}`);
                            window.open(`${BASEURL}/${response.data.message}`,"_blank")
                          }} style={{cursor:"pointer"}}>
                      <svg style={{width:"1.2em"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>

                    </div>
                    </div>
              
                    <div>
                      <p>{userprofile.bio}</p>
                    </div>




                    </div>
                    <div style={{flex:"0.2"}}>

                      <h3>Recent Activities</h3>
                      {userpost.map((post)=>{
                        return(
                          <div key={post._id} className={styles.postcard}>
                            <div className={styles.card}>
                              <div className={styles.cardprofile}>
                                {post.media !==""?    <img  src={`https://res.cloudinary.com/dzy8dseio/image/upload/v1751093097/ProfConnect/${post.media}`} alt="" />
                                :<div style={{width:"3.4rem",height:"3.4rem"}}></div>}

                              </div>
                              <p>{post.body}</p>
                            </div>
                          </div>
                        )
                      })}
                       
                    </div>
                  </div>
                  
                </div>
                <div className={styles.workhistory}>
                  <h3>Work history</h3>
                  <div className={styles.workhistorycontainer}>
                    {
                      userprofile.pastWork.map((work,index)=>{
                        return(
                          <div className={styles.workhistorycard}>
                            <p style={{fontWeight:"bold",display:"flex",alignItems:"center",gap:"0.8rem"}}>{work.company} - {work.position}</p>
                            <p>{work.years} years</p>
                          </div>

                        )
                      })
                    }
                  </div>
                </div>
                <div className={styles.workhistory}>
                  <h3>Education</h3>
                  <div className={styles.workhistorycontainer}>
                    {
                      userprofile.education.map((education,index)=>{
                        return(
                          <div className={styles.workhistorycard}>
                            <p style={{fontWeight:"bold",display:"flex",alignItems:"center",gap:"0.8rem"}}>{education.school} - {education.degree}</p>
                            <p>{education.feildOfStudy}</p>
                          </div>

                        )
                      })
                    }
                  </div>
                </div>
        </div>
    
    </Dashboardlayout>
    </Userlayout>
  )
}
export async function getServerSideProps(context) {
  console.log(context.query.username);
  const request=await clientserver.get("/user/get_profile_based_on_username",{
    params:{
      username:context.query.username
    }
  })
  const response=await request.data;
  console.log(response);
  return {props:{userprofile:request.data.profile}}

}