import { deletecomment, deletelikecomment, getcomments, likecomment, postcommnet } from "../controller/commnet.controller.js";
import { verifytoken } from "../midleware/auth.js";
import express from "express";

let router = express.Router();

router.post("/pcomment",postcommnet)
router.get("/getdata",getcomments)
router.post('/commentlike',verifytoken,likecomment)
router.delete('/deletecommentlike',verifytoken,deletelikecomment)
router.delete("/deletecomment",deletecomment)
export default router;