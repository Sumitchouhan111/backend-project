import  { DataTypes } from "sequelize";
import sequelize from "../db/db.config.js";

const Comments=sequelize.define('comments',{
    commnetid:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    postId:{
        type:DataTypes.INTEGER,
        references:{
            model:"posts",
            key:"postid"
        },
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER,
        references:{
            model:"users",
            key:"id"
        },
        allowNull:false
    },
    commentText:{
        type:DataTypes.STRING,
        allowNull:false
    },

})

Comments.sync().then(res=>{
    console.log("Comments table created");
}).catch(err=>{
    console.log("error in comments table commnets table not created "); 
})

export default Comments;