import express from 'express';
import { created,findid,login,serchusers,updatebio,updatepassword,updateprofilepic,userdata } from '../controller/user.controller.js';

const router = express.Router();

router.post("/create",created);
router.post("/login",login);
router.put("/updatebio",updatebio);
router.put("/updatepassword",updatepassword);
router.put("/updateprofile",updateprofilepic)
router.post("/data",userdata)
router.post("/findbyid",findid)
router.post("/serchuser",serchusers)

export default router;