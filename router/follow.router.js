import express from "express";
import { deletefollowrelation, findfollowdata, finduserdatawithfollow, finduserdatawithfollowing, followcreate, followfollowingcount } from "../controller/follow.controller.js";
import { verifytoken } from "../midleware/auth.js";
let router = express.Router();

router.post("/followstart",verifytoken,followcreate);
router.post("/findfollow",verifytoken,findfollowdata);
router.delete("/deleterelation",verifytoken,deletefollowrelation)
router.post("/followfollowingcount",verifytoken,followfollowingcount)
router.post("/findfollow_withuserdata",verifytoken,finduserdatawithfollow)
router.post("/findfollowing_withuserdata",verifytoken,finduserdatawithfollowing);
export default router;