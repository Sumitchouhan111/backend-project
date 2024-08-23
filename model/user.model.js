import sequelize from "../db/db.config.js";
import { DataTypes } from "sequelize";
import bcrypt from 'bcryptjs';
import bodyParser from "body-parser";

let User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(v) {
            if (v.length >= 8 && v.length <= 50) {
                let saltkey = bcrypt.genSaltSync(10);
                let encryptpassword = bcrypt.hashSync(v, saltkey);
                this.setDataValue("password", encryptpassword);
            } else {
                throw new Error("Password size must be between 8 to 50 characters");
            }
        }
    },
    profilepic: {
        type: DataTypes.STRING,
    },
    bio: {
        type: DataTypes.STRING
    }
});

User.checkPassword =(password,encryptpassword)=> {

    console.log(1212);
    
    let ans=  bcrypt.compareSync(password,encryptpassword);
    console.log(21212);
    
    return ans;
};

User.sync()
    .then(() => {
        console.log("User table created successfully");
    })
    .catch(err => {
        console.error("Error creating user table:", err);
    });



    export default User;
