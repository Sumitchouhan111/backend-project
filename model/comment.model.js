import  { DataTypes } from "sequelize";
import sequelize from "../db/db.config.js";

const Comments=sequelize.define('comments',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    postId:{
        type:DataTypes.INTEGER,
    },
    userId:{
        type:DataTypes.INTEGER,
    },
    commentText:{
        type:DataTypes.TEXT,
    },

})