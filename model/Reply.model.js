import sequelize from "../db/db.config.js";
import { DataTypes } from "sequelize";

export const Reply = sequelize.define('Reply',{
    Replyid:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    rcid:{
        type:DataTypes.INTEGER,
        references:{
            model:"comments",
            key:'commnetid'
        },
        allowNull:false
    },
    ruid:{
        type:DataTypes.INTEGER,
        references:{
            model:"users",
            key:'id'
        },
        allowNull:false
    },
    replytext:{
        type:DataTypes.STRING,
        allowNull:false
    
    }
})

Reply.sync().then(res=>{
    console.log("reply table created");
}).catch(err=>{
    console.log("error in reply table ");  
})