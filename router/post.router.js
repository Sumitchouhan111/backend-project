import { createpost,hide,pin,delet, findpost, singlepostdata } from "../controller/post.controller.js";
import express from "express";

let postrouter=express.Router();

postrouter.post("/create",createpost);
postrouter.put("/hideandview",hide);
postrouter.put("/pinpost",pin);
postrouter.delete("/delete",delet);
postrouter.post("/findpost",findpost);
postrouter.post("/findsinglepost",singlepostdata)

export default postrouter;
