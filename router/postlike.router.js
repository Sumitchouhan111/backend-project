import express from "express";
import { apllylike, deletlike, find } from "../controller/postlike.controler.js";


let router = express.Router();

router.post("/likepost",apllylike);
router.delete("/delete",deletlike);
router.post("/finduserpostlike",find);

export default router;