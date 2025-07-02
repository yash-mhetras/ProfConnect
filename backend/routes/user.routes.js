import { Router } from "express";
import { acceptconnection, downloadprofile, getalluserprofile, getconnectionrequest, getuserandprofile, getuserandprofilebasedonusername, login, register,  sendconnetcionrequest,  updateprofile,  updateuserprofile, uploadprofilepicture, whataremyconnections } from "../controllers/user.controller.js";
import multer from 'multer';

const router=Router();

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload=multer({storage:storage});
router.route("/register").post(register);
router.route("/login").post(login)
router.route("/update_profile_picture").post(upload.single('profilePicture'),uploadprofilepicture);
router.route("/user_update").post(updateuserprofile);
router.route("/get_user_and_profile").get(getuserandprofile);
router.route("/update_profile").post(updateprofile);
router.route('/user/get_alluser_profile').get(getalluserprofile);
router.route('/user/download_resume').get(downloadprofile);
router.route('/user/send_connection_request').post(sendconnetcionrequest);
router.route('/user/get_connection_request').get(getconnectionrequest);
router.route('/user/user_connection_request').get(whataremyconnections);
router.route('/user/update_connection_request').post(acceptconnection);
router.route('/user/get_profile_based_on_username').get(getuserandprofilebasedonusername)

export default router;
