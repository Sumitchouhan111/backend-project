import postlike from "../model/postlike.model.js";

export const apllylike= async(req,res,next)=>{
    let {postid,userid}=req.body;
    try {
        let like=await postlike.create({
            postid,
            userid
        })
        if (like) {
            return res.status(200).json({msg:"like success full"})
        }
    } catch (error) {
        return res.status(500).json({error:"internal server error" ,error})
    }
}

export const deletlike= async(req,res,next)=>{
    let {postid,userid}=req.body;
    try {
        let like=await postlike.destroy({
            where:{
                postid,
                userid
            }
           
        })
        if (like) {
            return res.status(200).json({msg:"delete success full"})
        }
    } catch (error) {
        return res.status(500).json({error:"internal server error"})
    }
}

export const find= async(req,res,next)=>{
    let {postid,userid}=req.body;
    try {
        let like=await postlike.findOne({
            where:{
                postid,
                userid
            },
            attributes:["userid","postid"]            
        })
        if (like) {
            return res.status(200).json({msg:"find succesfully",ans:like})
        }
    } catch (error) {
        return res.status(500).json({error:"internal server error",error})
    }
}
