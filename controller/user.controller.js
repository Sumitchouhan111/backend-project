
import User from "../model/user.model.js";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";

import { Result } from "express-validator";
// import { raw } from "body-parser";

function isEmail(str) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(str);
}

export const created = async (req,res,next)=>{
    try {
       let {username,email,password}=req.body;
        console.log(username);
       let ans = await User.create({
        username,
        email,
        password,
        bio:"add your bio"
    
       }
     
       
    )
    const payload = req.body.email;
    const token = jwt.sign(payload,"adfflasdfjjao");
          console.log(ans);
       if (ans) 
        console.log(ans);
        return res.status(200).json({user:"user created successfull",token})

    } catch (error) {
        console.log(error);
        
        if (error.email==null || error.password==null || error.username==null) {
            return res.status(400).json({msg:"bad reqest "});
        }
        return res.status(500).json({msg:"internal server error "})
    }
}


export const login = async (req,res,next)=>{
    try {
        console.log(req.body);
        
        let {login,password}=req.body;
        
         let ans;

         if (isEmail(login)) {
            ans = await User.findOne({where:{email:login},raw:true });
            console.log("email");
         }
         else{
            ans= await User.findOne({where:{username:login},raw:true})
            console.log("username");
         }

        if (!ans) {
            return res.status(404).json({msg:"this user is not exist"});
        }
        if (ans) 
          console.log(12);
            let isMatch= await User.checkPassword(password,ans.password);
            console.log(isMatch,'sfsdfasf');
            if (isMatch) {
                console.log(1212);
                const payload = {id:ans.id,email:ans.email};
                console.log(payload);
                
                const token = jwt.sign(payload,"adfflasdfjjao");
                
                return res.status(200).json({ans,token})
            }

            return res.status(401).json({msg:"your paswoord is wrong"})
 
     } catch (error) {
        console.log(error,"asfdsaf");
         return res.status(500).json({msg:"internal server error sfsdfsdff   "})
     }
}



export const updatepassword = async (req,res,next)=>{
    try {
        let {login,oldpassword,newpassword}=req.body;
        let ans;
        
        if ( isEmail(login)) {

            
            ans=await User.findOne({where:{email:login},raw:true});

            if (ans) {
                let ismatch=User.checkPassword(oldpassword,ans.password);

                if (ismatch) {
                    let update= User.update({password:newpassword},{where:{email}})

                    if (update) {
                        return res.status(200).json({msg:"update success full  "})
                    }
                    return res.status(400).json({msg:"error in updating"})
                }

                return res.status(400).json({msg:"passwod is not a same"})
                
            }
            return res.status(400).json({msg:"this eamil is not exist"})
        }
        else{
            ans=await User.findOne({where:{username:login},raw:true});

            if (ans) {
                let ismatch=User.checkPassword(oldpassword,ans.password);

                if (ismatch) {
                    let update= User.update({password:newpassword},{where:{username:login}})

                    if (update) {
                        return res.status(200).json({msg:"update success full  "})
                    }
                    return res.status(400).json({msg:"error in updating"})
                }
                return res.status(400).json({msg:"password is not match"})
            }
            return res.status(400).json({msg:"wrong username"})
        }
        


    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"internal server error"})
    }
}


export const updatebio = async (req,res,next)=>{
    try {
        console.log(12);
        let {email,bio}=req.body;
        
        let ans = await User.update({bio},{where:{email}});
        console.log(ans);
        if (ans) {
            return res.status(200).json({msg:"update successfully"});
        }
        return res.status(400).json({msg:"update not success full"});
    } catch (error) {
        return res.status(500).json({msg:"internal server error"});
    }
}


export const updateprofilepic = async (req,res,next)=>{
    try {
        
        let {email,profilepic}=req.body;
        let ans = await User.update({profilepic},{where:{email}});
        console.log(ans);
        if (ans) {
            return res.status(200).json({msg:"update successfully"});
        }
        return res.status(400).json({msg:"update not success full"});
    } catch (error) {
        return res.status(500).json({msg:"internal server error"});
    }
}


export const userdata = async (req,res,next)=>{
    try {
        console.log(12);
        let {email}=req.body;
        
        let ans = await User.findOne({where:{email},
            attributes:['username','email','profilepic','bio',"id"]
        });
        console.log(ans);
        if (ans) {
            return res.status(200).json({ans,msg:"find data succuessfully "});
        }
        return res.status(400).json({msg:"find not success full"});
    } catch (error) {
        return res.status(500).json({msg:"internal server error"});
    }
}

export const findid = async (req,res,next)=>{
    try {
        console.log(12);
        let {id}=req.body;
        
        let ans = await User.findOne({where:{id},
            attributes:['username','email','profilepic','bio',"id"]
        });
        console.log(ans);
        if (ans) {
            return res.status(200).json({ans,msg:"find data succuessfully "});
        }
        return res.status(400).json({msg:"find not success full"});
    } catch (error) {
        return res.status(500).json({msg:"internal server error"});
    }
}

export const serchusers = async (req,res,next)=>{
    console.log(1);
    
      try {
        let {serchdata}=req.body;
       let data= await User.findAll({where:{
            username:{
                [Op.like]:`${serchdata}%`
            }
        },
     
      order:[['createdAt','DESC']],
      attributes:['username','profilepic','id']
    })
     
    if ( data.length>0) {
        return res.status(200).json({msg:"user found succefully",data})
    }
    else{
        return res.status(200).json({msg:"usernot not found",data})
    }
       
      } catch (error) {
        return res.status(500).json({msg:"internal server error"})
      }
}


// dheeraj.drishticps@iiti.ac.in
