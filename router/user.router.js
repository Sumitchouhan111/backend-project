import express from 'express';
import { created,findid,login,serchusers,updatebio,updatepassword,updateprofilepic,userdata } from '../controller/user.controller.js';
import { verifytoken } from '../midleware/auth.js';
const router = express.Router();

router.post("/create",created);
router.post("/login",login);
router.put("/updatebio",verifytoken,updatebio);
router.put("/updatepassword",verifytoken,updatepassword);
router.put("/updateprofile",verifytoken,updateprofilepic)
router.post("/data",verifytoken,userdata)
router.post("/findbyid",verifytoken,findid)
router.post("/serchuser",verifytoken,serchusers)

export default router;