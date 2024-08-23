import express from "express";
import { deletefollowrelation, findfollowdata, followcreate } from "../controller/follow.controller.js";

let router = express.Router();

router.post("/followstart",followcreate);
router.post("/findfollow",findfollowdata);
router.delete("/deleterelation",deletefollowrelation)

export default router;