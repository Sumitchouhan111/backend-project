
// import { where } from "sequelize";
import  post from "../model/post.model.js";





export const createpost = async (req, res, next) => {
    try {
        let { imgvideo, caption, mediatype,id} = req.body;
        console.log(12);
        let  ans = await post.create({
            imgvideo, caption, mediatype,userId:id
        })

        console.log(121);
        console.log(ans);
        console.log(121);

        if (ans) {
            return res.status(200).json({ msg: "creted succefully " })
        }
        return res.status(400).json({ msg: "bad request" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "internal server error " })
    }
}


export const hide = async (req, res, next) => {
    try {
        let { postid, hide } = req.body;

        let ans =await post.update({ hide }, { where:{ postid} });
         console.log(ans);
        if (ans) {
            return res.status(200).json({ msg: "hide success fully " })
        }
        return res.status(400).json({ msg: "bed request " })
    } catch (error) {
        return res.status(500).json({ msg: 'internal server error' })
    }
}


export const pin =async (req, res, next) => {
    try {

        let { postid, pin } = req.body;

        let ans =await post.update({ pin }, { where: { postid } })

        if (ans) {
            return res.status(200).json({ msg: "post pin successfully" })
        }
        return res.status(400).json({ msg: "bed request " })

    } catch (error) {
        return res.status(500).json({ msg: "internal server eeror" })
    }
}

export const delet =async (req, res, next) => {
    
    try {
        let {postid}=req.body;
        let ans =await post.destroy({where:{postid}});

        if (ans) {
            return res.status(200).json({msg:"delet this post successfully "})
        }
        return res.status(400).json({msg:"bad request"})

    } catch (error) {
        return  res.status(500).json({msg:"intrenal server error "})
    }

}

export const  findpost = async(req,res,next)=>{
    try { 
        console.log(333);
        
        let {userid}=req.body;
        let ans=await post.findAll({where:{userId:userid},
            attributes: [
              'postid',
              'imgvideo',
              'caption',
              'mediatype',
              'hide',
              'pin',
              'userId',
              'createdAt',
              'updatedAt'
            ]})
        
          
        if (ans) {
            console.log(1212,ans);
            
            return res.status(201).json({ans,msg:"data find succefull"})
        }
        else{
            return res.status(401).json({error:"bad request"})
        }

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({error:"internal server error"})
    }
}

export const  singlepostdata = async(req,res,next)=>{
    try { 
        console.log(333);
        
        let {postid}=req.body;
        let ans=await post.findOne({where:{postid},
            attributes: [
              'postid',
              'imgvideo',
              'caption',
              'mediatype',
              'hide',
              'pin',
              'userId',
              'createdAt',
              'updatedAt'
            ]})
        
          
        if (ans) {
            console.log(1212,ans);
            
            return res.status(201).json({ans,msg:"data find succefull"})
        }
        else{
            return res.status(401).json({error:"bad request"})
        }

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({error:"internal server error"})
    }
}