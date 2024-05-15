const { Model, DataTypes } = require('sequelize');
//argon2 is being used to hash the passwords
const argon2 = require('argon2');
const sequelize = require('../config/connection.js');

class User extends Model {
//argon2 hashing
   async hashPassword(){
    try{
        //checking if the password has changed before hashing it
        if(this.changed('password')){
            this.password = await argon2.hash(this.password);
        }
    } catch (err){
        console.log("Error hashing password", err);
    }
   }
   
   async verifyPassword(password){
    try{
        //verifies password during login
        return await argon2.verify(this.password, password);
    } catch (err) {
        console.log("Error verifying password", err);
        return false;
    }
   }
}

User.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull:true,
            primaryKey:true,
            autoIncrement:true
        },
        username:{
            type: DataTypes.STRING,
            allowNull:true,
            unique:true,
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isEmail:true
            },
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                len: [8],
            },
        },
        firstName:{
            type: DataTypes.STRING,
            allowNull:false
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        hooks: {
            // password hashing is called before it is sent to the db
            beforeCreate: async (user) => {
                await user.hashPassword();
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;