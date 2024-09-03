import { createpost,hide,pin,delet, findpost, singlepostdata, postalluser } from "../controller/post.controller.js";
import express from "express";
import { verifytoken } from "../midleware/auth.js";
let postrouter=express.Router();

postrouter.post("/create",verifytoken,createpost);
postrouter.put("/hideandview",verifytoken,hide);
postrouter.put("/pinpost",verifytoken,pin);
postrouter.delete("/delete",verifytoken,delet);
postrouter.post("/findpost",verifytoken,findpost);
postrouter.post("/findsinglepost",verifytoken,singlepostdata)
postrouter.get("/postalluser",postalluser)

export default postrouter;
