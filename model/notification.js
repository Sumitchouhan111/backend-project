import { DataTypes } from "sequelize";
import sequelize from "../db/db.config.js";
import { Result } from "express-validator";


const notification = sequelize.define("notification",{
    nid:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    ruid:{
        type: DataTypes.INTEGER,
        references: {
          model: 'users', 
          key: 'id',
        }
    },
    puid:{
        type: DataTypes.INTEGER,
        references: {
          model: 'users', 
          key: 'id',
        }
    },
    ntype:{
        type:DataTypes.STRING,
        allowNull:false
    },
    post:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
})

notification.sync().then(ans =>{
    console.log("notification table created");
    
}).catch(error =>{
    console.log("error in notification table "); 
})

export default notification;