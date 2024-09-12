import express from "express";
import { apllylike, deletlike, find, likecount, likehistry } from "../controller/postlike.controler.js";
import { verifytoken } from "../midleware/auth.js";

let router = express.Router();

router.post("/likepost",verifytoken,apllylike);
router.delete("/delete",verifytoken,deletlike);
router.post("/finduserpostlike",verifytoken,find);
router.post("/likescount",verifytoken,likecount);
router.post("/histrylikes",likehistry)
export default router;