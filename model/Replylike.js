import sequelize from "../db/db.config.js";
import { DataTypes } from "sequelize";

export const replylike = sequelize.define('replylike',{
    replylikeid:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    replayid:{
        
    }
})