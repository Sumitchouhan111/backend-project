import Comments from "../model/comment.model.js";
import User from "../model/user.model.js";
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
        const comments = await Comments.findAll({
            where: {
                postId: req.query.postId
            },
            order: [['createdAt', 'DESC']],
            attributes: ['postId', 'userId', 'commentText'], // Adjust attributes as needed
            include: [
                {
                    model: User,  // Include the User model
                    attributes: ['username', 'profilepic']  // Specify the attributes you want from the User model
                }
            ],
            raw:true
        });
          console.log(comments);
          
        return res.status(200).json({ data: comments });
    } catch (error) {
        console.error("Error fetching comments with user:", error);
        return res.status(500).json(error);
    }
}
