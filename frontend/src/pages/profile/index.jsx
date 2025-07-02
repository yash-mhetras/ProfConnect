import { getaboutuser } from '@/config/redux/action/authaction';
import Dashboardlayout from '@/layouts/dashboardlayout'
import Userlayout from '@/layouts/userlayouts'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.css'
import { BASEURL, clientserver } from '@/config';
import { getallposts } from '@/config/redux/action/postaction';

export default function profilepage() {
const dispatch=useDispatch();
const authstate=useSelector((state)=>state.auth);
 const postreducer=useSelector((state)=>state.posts);
const [userprofile,setuserprofile]=useState({});
const [userpost, setuserpost] = useState([]);
const [ismodalopen,setismodalopen]=useState(false);
const [ismodelopen,setismodelopen]=useState(false);
const [inputdata,setinputdata]=useState({company:'',position:'',years:''});
const [inputdataeducation,setinputdataeducation]=useState({school:'',degree:'',feildOfStudy:''});
const handleworkinput=(e)=>{
  const{name,value}=e.target;
  setinputdata({...inputdata,[name]:value})
}

const handleeducationinput=(e)=>{
  const{name,value}=e.target;
  setinputdataeducation({...inputdataeducation,[name]:value})
}
useEffect(() => {
  dispatch(getaboutuser({ token: localStorage.getItem('token') }));
  dispatch(getallposts())
}, []);

useEffect(() => {
  if (authstate.user !== undefined) {
    setuserprofile(authstate.user);
    console.log("user set:", authstate.user); 
       let post=postreducer.posts.filter((post)=>{
      return post.userid.username===authstate.user.userid.username
    })
    setuserpost(post);
  }
}, [authstate.user,postreducer.posts]);

const updateprofilepicture=async(file)=>{
  const formdata=new FormData();
  formdata.append("profilePicture",file);
  formdata.append("token",localStorage.getItem('token'));
  const response=await clientserver.post('/update_profile_picture',formdata,{
    headers:{
      "Content-Type":"multipart/form-data"
    }
  })
  dispatch(getaboutuser({token:localStorage.getItem('token')}))
}

const updateprofiledata=async()=>{
  const resquest=await clientserver.post('/user_update',{
    token:localStorage.getItem('token'),
    name:userprofile.userid.name

  })




}
const updateuserprofiledata=async()=>{
    const response=await clientserver.post('/update_profile',{
    token:localStorage.getItem('token'),
    bio:userprofile.bio,
    currentPost:userprofile.currentPost,
    pastWork:userprofile.pastWork,
    education:userprofile.education
  })
  dispatch(getaboutuser(localStorage.getItem('token')));
}

  return (
    

        <Userlayout>
            
    <Dashboardlayout>
        {userprofile && userprofile.userid &&
         <div className={styles.container}>
          <div className={styles.backdropcontainer}>
            <label className={styles.backdropoverlay} htmlFor="profilepictureupload">
              <p>Edit</p>
            </label>
            <input onChange={(e)=>{
              updateprofilepicture(e.target.files[0]);
            }} type="file" id='profilepictureupload' hidden />
                <img className={styles.backdropprofile} src={`${BASEURL}/${userprofile.userid.profilePicture}`} alt="" />
             
          </div>
             <div className={styles.profiledetails} >
                  <div className={styles.profileflex}>
                    <div style={{flex:"0.8"}}>

                      <div className={styles.profileflexone}>
                      <input className={styles.nameedit} type="text" value={userprofile.userid.name} onChange={(e)=>{
                        setuserprofile({...userprofile,userid:{...userprofile.userid,name:e.target.value}}); 
                      }} />
                      <p style={{ color: "grey" }}>@{userprofile.userid.username}</p>
                    </div>
               
              
                    <div>
                      <textarea
  value={userprofile.bio}
  onChange={(e) => {
    setuserprofile({ ...userprofile, bio: e.target.value });
  }}
  rows={Math.max(3, Math.ceil(userprofile.bio.length / 80))}
  style={{ width: "100%" }}
/>

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
                          <div key={index} className={styles.workhistorycard}>
                            <p style={{fontWeight:"bold",display:"flex",alignItems:"center",gap:"0.8rem"}}>{work.company} - {work.position}</p>
                            <p>{work.years} years</p>
                          </div>

                        )
                      })
                    }
                    <button className={styles.addworkbtn} onClick={()=>{
                      setismodalopen(true)

                    }}>Add Work</button>
                  </div>
                </div>
                <div className={styles.workhistory}>
                  <h3>Education</h3>
                  <div className={styles.workhistorycontainer}>
                    {
                      userprofile.education.map((education,index)=>{
                        return(
                          <div key={index} className={styles.workhistorycard}>
                            <p style={{fontWeight:"bold",display:"flex",alignItems:"center",gap:"0.8rem"}}>{education.school} - {education.degree}</p>
                            <p>{education.feildOfStudy}</p>
                          </div>

                        )
                      })
                    }
                    <button className={styles.addworkbtn} onClick={()=>{
                      setismodelopen(true)

                    }}>Add Education</button>
                  </div>
                </div>
                {
                  userprofile != authstate.user &&
                  <div onClick={()=>{updateprofiledata();  dispatch(getaboutuser({token:localStorage.getItem('token')}));updateuserprofiledata(); dispatch(getaboutuser({token:localStorage.getItem('token')}))}} className={styles.connectbtn}>
                    Update Profile
                  </div>
                }
        </div>
    
                }
                 {ismodalopen && <div onClick={()=>{
                  setismodalopen(false)
                 }} className={styles.commentcontainer}>
                <div onClick={(e)=>{e.stopPropagation()}}  className={styles.allcommentscontainer}>
                  <input type="text" name='company' onChange={handleworkinput} className={styles.inputfeild} placeholder='Enter Company'/>
                    <input type="text" name='position' onChange={handleworkinput} className={styles.inputfeild} placeholder='Enter position'/>
                      <input type="number" name='years' onChange={handleworkinput} className={styles.inputfeild} placeholder='Enter years'/>
                      <div className={styles.connectbtn} onClick={()=>{
                        setuserprofile({...userprofile,pastWork:[...userprofile.pastWork,inputdata]})
                        setismodalopen(false);
                      }}>Add work</div>

                   
                </div>


            </div>
            
            }
             {ismodelopen && <div onClick={()=>{
                  setismodelopen(false)
                 }} className={styles.commentcontainer}>
                <div onClick={(e)=>{e.stopPropagation()}}  className={styles.allcommentscontainer}>
                  <input type="text" name='school' onChange={handleeducationinput} className={styles.inputfeild} placeholder='Enter school'/>
                    <input type="text" name='degree' onChange={handleeducationinput} className={styles.inputfeild} placeholder='Enter degree'/>
                      <input type="text" name='feildOfStudy' onChange={handleeducationinput} className={styles.inputfeild} placeholder='Enter feild of study'/>
                      <div className={styles.connectbtn} onClick={()=>{
                        setuserprofile({...userprofile,education:[...userprofile.education,inputdataeducation]})
                        setismodelopen(false);
                      }}>Add Education</div>

                   
                </div>


            </div>
            
            }
     </Dashboardlayout>
    </Userlayout>
   
  )
}
