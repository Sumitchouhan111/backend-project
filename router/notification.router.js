import express from "express";
import { createnotification, deletenotification } from "../controller/notification.controller.js";

let router = express.Router();

router.post("/createnotification",createnotification)
router.post("/deletenotification",deletenotification);
export default router;