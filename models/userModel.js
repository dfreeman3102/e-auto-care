const { Model, Datatypes } = require('sequelize');
//argon2 is being used to hash the passwords
const argon2 = require('argon2');
const sequelize = require('../config/connection.js');

class User extends Model {
//add argon2 hashing here later
   
}

User.init(
    {
        id:{
            type: Datatypes.INTEGER,
            allowNull:true,
            primaryKey:true,
            autoIncrement:true
        },
        username:{
            type: Datatypes.STRING,
            allowNull:true,
            unique:true,
        },
        email:{
            type: Datatypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isEmail:true
            },
        },
        password:{
            type: Datatypes.STRING,
            allowNull:false,
            validate:{
                len: [8],
            },
        },
        firstName:{
            type: Datatypes.STRING,
            allowNull:false
        },
        lastName:{
            type: Datatypes.STRING,
            allowNull: false
        },
        car_ID:{
            type: Datatypes.INTEGER,
            references:{
                model: 'cars',
                key: 'id'
            }
        },
        appt_ID:{
            type: Datatypes.INTEGER,
            references:{
                model: 'appt',
                key: 'id'
            }
        }
    },
    {
        hooks: {
            //add password hashing here
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;