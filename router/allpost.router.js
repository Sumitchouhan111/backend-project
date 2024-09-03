import express from "express";
import { userfollowpost } from "../controller/allpost.controller.js";

let router = express.Router();

router.post("/findpost",userfollowpost)


export default router;