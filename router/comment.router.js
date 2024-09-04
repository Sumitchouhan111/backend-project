import { getcomments, postcommnet } from "../controller/commnet.controller.js";
import express from "express";

let router = express.Router();

router.post("/pcomment",postcommnet)
router.get("/getdata",getcomments)

export default router;