
import  { DataTypes } from "sequelize";
import sequelize from "../db/db.config.js";



const post = sequelize.define("post",{

    postid:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    imgvideo:{
     type:DataTypes.STRING,
     allowNull:false
    },
    caption:{
       type:DataTypes.STRING,
    },
    mediatype:{
       type:DataTypes.STRING
    },
   
    hide:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue : false
    },
    pin:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue : false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users', 
          key: 'id',
        }
    }
});


post.sync().then(result=>{
    console.log("post table created ");
}).catch(error=>{
    console.log("post table not created error = ",error);
})
export default post;