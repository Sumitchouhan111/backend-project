
import follow from "../model/follow.model.js";

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
    
       return res.status(200).json({ans:"not found"})

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