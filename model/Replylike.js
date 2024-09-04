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
        type:DataTypes.INTEGER,
        references:{
            model:'replies',
            key:"Replyid"
        }
    },
    rluid:{
        type:DataTypes.INTEGER,
        references:{
            model:"users",
            key:"id"
        }
    }
})

replylike.sync().then(res=>{
    console.log("reply like created ");
}).catch(err=>{
    console.log("error in reply like ");
    
})