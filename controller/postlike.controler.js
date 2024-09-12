import post from "../model/post.model.js";
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
        return res.status(404).json({msg:"not found error"})
    } catch (error) {
        return res.status(500).json({error:"internal server error",error})
    }
}


export const likecount= async(req,res,next)=>{
    let {postid}=req.body;
    try {
        let like=await postlike.count({
            where:{
                postid 
            }          
        })
        if (like) {
            return res.status(200).json({msg:"total likes",ans:like})
        }
        return res.status(404).json({msg:"no like"})
    } catch (error) {
        return res.status(500).json({error:"internal server error",error})
    }
}

// export let currentuserpostlikescheck =async(req,res,next)=>{


//     try {
        
//     } catch (error) {
        
//     }
// }


export  let likehistry = async (req,res,next)=>{
    let {userid}=req.body;
    try {
        let data= await postlike.findAll({
            where:{
                userid
            },
            attributes:['postid'],
            raw :true
        })

        console.log(data);

        let array = data.map(data  => data.postid)
        
        let postdata = await post.findAll({
            where:{
                postid:array
            },
            attributes:['imgvideo','postid'],
            order:[['postid','DESC']]
        })
        
        return res.status(201).json({msg:'data find success full ', postdata})
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({error,e:"error in likehistry"})
    }
}