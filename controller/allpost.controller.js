import follow from "../model/follow.model.js";
import post from "../model/post.model.js";
import User from "../model/user.model.js";
import postlike from "../model/postlike.model.js";
import { Sequelize } from "sequelize";
import Op from "sequelize";

export const userfollowpost = async (req, res, next) => {
    const { userid } = req.body;

    try {
        // Fetch the users that the current user is following
        const followData = await follow.findAll({
            where: {
                userfollowid: userid
            },
            attributes: ["userfollowingid"]
        });

        const followedUserIds = followData.map(followed => followed.userfollowingid);

        // Fetch posts by the followed users
        const userspostdata = await post.findAll({
            where: {
                userid: followedUserIds
            },
            attributes: ["postid", "imgvideo", "caption", 'userid', "createdAt"],
            order: [['createdAt', 'DESC']]
        });

        let postids = userspostdata.map(data => data.dataValues.postid);
        let findpostinsideuserid = userspostdata.map(data => data.dataValues.userid);

        let uniqueArray = [...new Set(findpostinsideuserid)];

       
        let usersData = await User.findAll({
            where: { id: uniqueArray },
            attributes: ['username', 'email', 'profilepic', "id"],
            raw:true
        });
          
          
       
        const likesCount = await postlike.findAll({
            where: {
                postid: postids
            },
            attributes: ['postid', [Sequelize.fn('COUNT', Sequelize.col('postid')), 'totallike']],
            group: ['postid'],
            raw: true
        });

       
        let checklike = await postlike.findAll({
            where: {
                userid: userid
            },
            attributes: ['postid']
        });
        console.log(usersData);
        let setchecklike = checklike.map(data => data.postid);

        let likepostsarray = postids.filter(value => setchecklike.includes(value));

       
        let finalData = userspostdata.map(postData => {
            let userData = usersData.find(user => user.id === postData.dataValues.userid);
            console.log(userData);
            
            let postLikes = likesCount.find(like => like.postid === postData.postid);
            return {
                ...postData.dataValues,
                user: userData,
                totallike: postLikes ? postLikes.totallike : 0,
                likedByCurrentUser: likepostsarray.includes(postData.postid)
            };
        });

        return res.status(200).json({ finalData });
    } catch (error) {
        console.error("Internal server error: ", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
