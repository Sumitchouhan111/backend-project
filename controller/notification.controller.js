import notification from "../model/notification.js";


export const createnotification = async (req,res,next)=>{


    let {ruid,puid,ntype,post}=req.body;
    try {
        const createnoti  =await notification.create({
            ruid,puid,ntype,post
        });

        return res.status(201).json({msg:"create sussessfully",ans:createnoti})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"internal server error",})  
    }
}

export const deletenotification = async (req,res,next)=>{
    try {
        let {nid}=req.body;
        let result = await notification.destroy({
            where:{
                nid
            }
            
        })
        return res.status(200).json({msg:'delete success full',ans:result})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({msg:"internoal server error"})  
    }
}

let findAllnotification= async (req,res,next)=>{
    try {
        let {ruid}=req.body;
        let result = await notification.findAll({
          where:  {
            ruid
            }
        })
        return res.status(200).json({msg:"find all success ",ans:result})
    } catch (error) {
        return res.status(500).json({msg:"internal server error"})
    }
}