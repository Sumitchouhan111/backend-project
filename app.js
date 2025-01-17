import express from  'express';
import "./model/associate.js";
import postrouter from './router/post.router.js';
import bodyParser from 'body-parser';
import userrouter from './router/user.router.js';
import cors from 'cors';
import fileupload from 'express-fileupload';
import followrouter from './router/follow.router.js';
import postlike from './router/postlike.router.js';
import notification from './router/notification.router.js';
import allpost from './router/allpost.router.js';
import commentrouter from './router/comment.router.js';

const app=express();





app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends:true}));

app.use(fileupload({
    useTempFiles:true
}))

app.use(cors());


app.use("/user",userrouter);
app.use("/post",postrouter);
app.use("/follow",followrouter);
app.use("/postlike",postlike);
app.use("/notification",notification)
app.use("/allpost",allpost)

app.use("/comments",commentrouter)


app.listen(4000,()=>{
    console.log("server started successfull ");
});

export default app;