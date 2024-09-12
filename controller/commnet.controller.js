import Comments from "../model/comment.model.js";
import User from "../model/user.model.js";
import { commnetslike } from "../model/commentlike.js";
import postlike from "../model/postlike.model.js";
import { Sequelize } from "sequelize";


export const postcommnet = async (req, res, next) => {
    let { post, uid, text } = req.body;
       
    try {
        console.log('Starting to create a comment');

        let createdData = await Comments.create({

            postId: post,
            userId: uid,
            commentText: text
        });

        console.log('Comment created successfully');
        return res.status(201).json({ msg: 'Comment created successfully' });

    } catch (error) {
        console.error('Error creating comment:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export async function getcomments(req, res, next) {
    try {
        // Fetching comments based on the postId
        const comments = await Comments.findAll({
            where: {
                postId: req.query.postId
            },
            order: [['createdAt', 'DESC']],
            attributes: ['postId', 'userId', 'commentText', 'commnetid'], 
            include: [
                {
                    model: User,  
                    attributes: ['username', 'profilepic']  
                }
            ],
            raw: true
        });

        // Extracting comment IDs
        let commentIds = comments.map(dataa => dataa.commnetid);

        // Fetching liked comments based on commentIds and userId
        const commentlikecheck = await commnetslike.findAll({
            where: {
                cid: commentIds,
                uid: req.query.userId
            },
            attributes: ['cid'],
            raw: true
        });

        // Extracting liked comment IDs
        let clikecommentid = commentlikecheck.map(data => data.cid);

        // Fetching total like count for each comment
        const commentlikecount = await commnetslike.findAll({
            where: {
                cid: commentIds
            },
            attributes: ['cid', [Sequelize.fn('COUNT', Sequelize.col('cid')), 'totallikes']],
            group: ['cid'],
            raw: true
        });

        // Mapping like count by comment ID
        let likeCountMap = {};
        commentlikecount.forEach(item => {
            likeCountMap[item.cid] = item.totallikes;
        });

        // Merging isLiked and likeCount into comments
        let mergedComments = comments.map(comment => ({
            ...comment,
            isLiked: clikecommentid.includes(comment.commnetid), // Check if the comment is liked
            totallikes: likeCountMap[comment.commnetid] || 0 // Add total likes count
        }));

        return res.status(200).json({ data: mergedComments });
    } catch (error) {
        console.error("Error fetching comments with user:", error);
        return res.status(500).json(error);
    }
}




export let likecomment = async (req,res,next) => {
    let {cid,uid}=req.body;

    try {
        let like = await commnetslike.create({
            cid,
            uid
        },
    )

        console.log(like);
        return res.status(200).json({msg:"commentlike succsess full"})
        
    } catch (error) {
        return res.status(500).json({error:"error in like comment"})
    }
}


export let deletelikecomment = async (req,res,next) => {
    let {cid,uid}=req.body;
    
    try {
        let like = await commnetslike.destroy({
            where:{
                cid,
                uid
            }
          
        },
    )

        console.log(like);
        return res.status(200).json({msg:"like remove done"})
        
    } catch (error) {
        return res.status(500).json({error:"unlike in error "})
    }
}


export let deletecomment = async (req,res,next)=>{
    let {commnetid}=req.body;
    console.log(commnetid);
    
    console.log(commnetid);

    let childeltee = await commnetslike.destroy({
        where:{
            cid:commnetid
        }
    })
    
    try {
        let deletee = await Comments.destroy({
            where:{
                commnetid
            }
        })
    
       
        return res.status(200).json({msg:"delete comment"})
    } catch (error) {
        console.log(error);
        
        return  res.status(500).json({error:"error in delete comment "})
    }

}