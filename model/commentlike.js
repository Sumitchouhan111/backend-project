import sequelize from "../db/db.config.js";
import { DataTypes } from "sequelize";

export const commnetslike = sequelize.define('commentlikes',{
    commentlikeid:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    cid:{
        type:DataTypes.INTEGER,
        references:{
            model:"comments",
            key:'commnetid'
        },
        allowNull:false
    },
    uid:{
        type:DataTypes.INTEGER,
        references:{
            model:"users",
            key:"id"
        }
    }
})


commnetslike.sync().then(res=>{
    console.log("comments like table created");
}).catch(error=>{
    console.log('error in commetslike table ');
    
})