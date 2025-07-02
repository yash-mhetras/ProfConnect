import { getaboutuser } from '@/config/redux/action/authaction';
import { createpost, deletepost, getallcomments, getallposts, incrementpostlikes, postcomment } from '@/config/redux/action/postaction';
import Dashboardlayout from '@/layouts/dashboardlayout';
import Userlayout from '@/layouts/userlayouts';
import {  useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.css'
import { BASEURL } from '@/config';
import { resetpostid } from '@/config/redux/reducer/postreducer';


export default function Dashboard() {
   
    const router=useRouter();
    const authstate=useSelector((state)=>state.auth);
    const poststate=useSelector((state)=>state.posts);
    const dispatch=useDispatch();
 

    useEffect(()=>{
        if(authstate.istoken){
     
            dispatch(getallposts());
            dispatch(getaboutuser({token:localStorage.getItem('token')}))
           
        }
                if(!authstate.all_profile_fetched){
                    dispatch(getaboutuser({token:localStorage.getItem('token')}));
                }
                

    },[authstate.istoken])

    const [postcontent,setpostcontent]=useState("");
    const[filecontent,setfilecontent]=useState();
    const[commenttext,setcommenttext]=useState("");

      const handleupload=async()=>{
        await dispatch(createpost({file:filecontent,body:postcontent}));
        setpostcontent("");
        setfilecontent();
        dispatch(getallposts());
    }
    if(authstate.user){
  return (
    
    <Userlayout>
        <Dashboardlayout>
            
            <div className={styles.scrollcomponent}>
                <div className={styles.createpostcontainer}>
                    

                    <img className={styles.profilePicture}  src={`${BASEURL}/${authstate.user.userid.profilePicture}`} alt="" />
                    <textarea name="" id="" onChange={(e)=>setpostcontent(e.target.value)} value={postcontent} placeholder="what's in your mind?"></textarea>
                    <label htmlFor="fileupload">
                    <div className={styles.fab}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                    </div>

                    </label>
                         <input onChange={(e)=>setfilecontent(e.target.files[0])} type="file" hidden id='fileupload'/>
                    {postcontent.length>0&& <div className={styles.uploadbutton} onClick={handleupload} >
                        Post
                    </div>}
                   
       
                </div>
                <div className={styles.postcontainer}>
                {poststate.posts?.map((post) => (
                    <div key={post._id} className={styles.postcard}>
                    <div className={styles.postcardprofile}>
                        <img className={styles.userprofile} src={`${BASEURL}/${post.userid.profilePicture}`} alt="" />
                        <div style={{width:"100%"}}>
                            <div style={{display:"flex" ,gap:"18px",alignItems:"center", justifyContent:"space-between", width:"100%"}}>
                                <p style={{fontWeight:"bold"}}>{post.userid.name}

                                </p>
                                <div style={{right:"0"}}>
                                {
                                    post.userid._id===authstate.user.userid._id &&<div onClick={async()=>{
                                    await dispatch(deletepost(post._id))
                                    await dispatch(getallposts())

                                }}>
                                <svg  style={{height:"1.1rem",color:"red" ,cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                </div>
                                }
                                </div>
                       




                            </div>
                       
                            <p style={{color:"gray"}}>@{post.userid.username}</p>
                            <p style={{paddingTop:"1rem"}}>{post.body}</p>
                            <div className={styles.postpicture}>
                                <img  src={`https://res.cloudinary.com/dzy8dseio/image/upload/v1751093097/ProfConnect/${post.media}`} alt="" />

                            </div>
                            <div className={styles.optioncontainer}>
                                <div className={styles.singleoption} onClick={async ()=>{
                                    await dispatch(incrementpostlikes({token:localStorage.getItem("token"),postid:post._id}))
                                    await dispatch(getallposts())
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                    </svg>
                                    <p>{post.likes}</p>

                                </div>
                                <div onClick={()=>{
                                    dispatch(getallcomments({postid:post._id}))
                                }} className={styles.singleoption}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                                    </svg>

                                </div>
                                <div onClick={()=>{
                                    const text=encodeURIComponent(post.body)
                                    
                                    const twitterurl=`https://twitter.com/intent/tweet?text=${text}`;
                                    window.open(twitterurl,"_blank")

                                }} className={styles.singleoption}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                            </svg>

                                </div>
                            </div>

                        </div>
                        
                    </div>
                    </div>
                ))}
                </div>

            </div>
            {poststate.postid !== "" && <div onClick={()=>{
                dispatch(resetpostid())
            }} className={styles.commentcontainer}>
                <div onClick={(e)=>{e.stopPropagation()}} className={styles.allcommentscontainer}>

                    {poststate.comments.length===0 && <h2>No comments</h2>}
                    {poststate.comments.length !==0 && 
                    <div className={styles.finaldiv}>
                        {
                            poststate.comments.map((comment,index)=>{
                                return(
                                    <div className={styles.singlecomment} key={index}>
                                        <div className={styles.singlecommentprofile}>
                                            <img src={`${BASEURL}/${comment.userid.profilePicture}`} alt="" />
                                            <div>
                                                <p style={{fontWeight:"bold",fontSize:"1.2rem"}}>
                                                    {comment.userid.name}
                                                </p>
                                                <p>@{comment.userid.username}</p>
                                            </div>
                                        </div>
                                        <p>
                                            {comment.body}
                                        </p>
                                       
                                    </div>
                                )
                            })
                        }
                    </div>
                    }



                    <div className={styles.postcomment}>
                        <input type="text" value={commenttext} onChange={(e)=>setcommenttext(e.target.value)} placeholder='Comment' />
                        <div onClick={async()=>{
                            await dispatch(postcomment({postid:poststate.postid,body:commenttext}))
                            await dispatch(getallcomments({postid:poststate.postid}))
                        }} className={styles.commentbtn}>
                            <p>Send</p>
                        </div>
                    </div>
                </div>


            </div>
            
            }
           
        </Dashboardlayout>
     
   
    </Userlayout>
    
  )
}
else{
      return (
    
    <Userlayout>
        <Dashboardlayout>
            
            <div className={styles.scrollcomponent}>
             <h1>Loading...</h1>
            </div>
           
        </Dashboardlayout>
     
   
    </Userlayout>
    
  )

}
}
