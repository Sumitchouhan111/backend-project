
import { where } from "sequelize";
import follow from "../model/follow.model.js";
import User from "../model/user.model.js";
export const followcreate =async (req,res,next)=>{
    try {
        let {userfollowid,userfollowingid}=req.body;

        let result = await follow.create({
          userfollowid,
          userfollowingid
        })
       return res.status(200).json({msg:"follow succefully"});

    } catch (error) {
        return res.status(500).json({msg:"internal  server error"})
    }
}

export const findfollowdata = async (req,res,next)=>{
    console.log(121212121112);
    
    try {
        let {userfollowid,userfollowingid}=req.body;
        console.log(userfollowid," sdfdsfdsf ",userfollowingid);
        
        let finddata = await follow.findOne({
            where:{
           userfollowid:userfollowid,
           userfollowingid : userfollowingid
        },
        attributes:["fid"]
    });
    if (finddata) {
        return res.status(200).json({msg:"data find success fully",ans:finddata})
    }
       return res.status(404).json({ans:"not found"})
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deletefollowrelation = async (req,res,next)=>{
    console.log(121212121112);
    
    try {
        let {userfollowid,userfollowingid}=req.body;
        console.log(userfollowid," sdfdsfdsf ",userfollowingid);
        
        let finddata = await follow.destroy({
            where:{
           userfollowid:userfollowid,
           userfollowingid : userfollowingid
        }
    });
    console.log(finddata);
    
    if (finddata) {
        return res.status(200).json({msg:"data relation delete",ans:finddata})
    }
       return res.status(404).json({ans:"not found"})
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const followfollowingcount=async (req,res,next) => {
    let {userid}=req.body;
    try {
        let followw = await follow.count({
            where:{
                userfollowid:userid
            }
        })

        let following = await follow.count({
            where:{
                userfollowingid:userid
            }
        })
         return res.status(200).json({ans:[followw,following]})
        
    } catch (error) {
        return res.status(500).json({error:"internal server error in count following and follow"})
    }
}



export const finduserdatawithfollow = async (req, res, next) => {
    const { userid } = req.body;

    try {
        
        const followData = await follow.findAll({
            where: {
                userfollowingid: userid
            },
            attributes: ["userfollowid"] 
        });

      
        const followedUserIds = followData.map(follow => follow.userfollowid);

        const userData = await User.findAll({
            where: {
                id: followedUserIds 
            },
            attributes: ['id', 'profilepic', 'username'] 
        });

        
        return res.status(200).json({ ans: userData });
    } catch (error) {
        console.error("Internal server error: ", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const finduserdatawithfollowing = async (req, res, next) => {
    const { userid } = req.body;
    console.log("-==-=-=-=-=",userid);
    
    try {
        
        const followData = await follow.findAll({
            where: {
                userfollowid: userid
            },
            attributes: ["userfollowingid"] 
        });

        console.log(followData);
        
        const followedUserIds = followData.map(follow => follow.userfollowingid);
        console.log(followedUserIds);
        
        const userData = await User.findAll({
            where: {
                id: followedUserIds 
            },
            attributes: ['id', 'profilepic', 'username'] 
        });

        
        return res.status(200).json({ ans: userData });
    } catch (error) {
        console.error("Internal server error: ", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};