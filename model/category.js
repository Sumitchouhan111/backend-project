
import sequelize from "../db/db.config.js";
import { DataTypes } from "sequelize";

const Category=sequelize.define('category',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    categoryType:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

