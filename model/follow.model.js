import { DataTypes } from "sequelize";
import sequelize from "../db/db.config.js";

const follow=sequelize.define("follow",{
    fid:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,   
    },
    userfollowid:{
        type:DataTypes.INTEGER,
        references:{
            model:"users",
            key:"id"
        },
        allowNull:false
    },
    userfollowingid:{
        type:DataTypes.INTEGER,
        references:{
            model:"users",
            key:"id"
        },
        allowNull:false

    }
})

follow.sync().then(res=>{
    console.log("follow table create successfully");
    
}).catch(err=>{
    console.log("not created follow table",err);
    
})

export default follow;