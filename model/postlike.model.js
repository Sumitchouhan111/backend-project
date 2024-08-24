import { DataTypes } from "sequelize";
import sequelize from "../db/db.config.js";


let postlike = sequelize.define("postlike",{
    postlikeid:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    postid:{
        type:DataTypes.INTEGER,
        references:{
            model:"posts",
            key:"postid"
        },
         allowNull:false
    },
    userid:{
        type:DataTypes.INTEGER,
        references:{
            model:"users",
            key:"id"
        },
        allowNull:false
    }
})

postlike.sync().then(res=>{
    console.log("postlike table create sussessfully ");
    
}).catch(err=>{
    console.log("err in post id ",err);
    
})

export default postlike;