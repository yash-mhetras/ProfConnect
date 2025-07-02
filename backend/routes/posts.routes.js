import { Router } from "express";
import { activeCheck, createpost, deletecomment, deletepost, get_comment_by_post, getallposts, incrementlikes } from "../controllers/posts.controller.js";
import multer from "multer";
import { storage as cloudinaryStorage } from "../cloudconfig.js";
import {commentpost}   from "../controllers/user.controller.js";

const router=Router();

const upload = multer({ storage: cloudinaryStorage });
router.route("/").get(activeCheck);

router.route("/post").post(upload.single('media'), createpost);

router.route('/posts').get(getallposts);
router.route('/delete_post').delete(deletepost);
router.route('/comment').post(commentpost);
router.route('/get_comments').get(get_comment_by_post);
router.route('/delete_comment').delete(deletecomment);
router.route('/increment_likes').post(incrementlikes);


export default router;