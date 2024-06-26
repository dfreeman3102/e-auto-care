const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Appointment extends Model { }

Appointment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        date: {
            type: DataTypes.DATEONLY, // stores date only, without time
            allowNull: false
        },

        time: {
            type: DataTypes.TIME,  //stores time only, ideal for managing appointment time
            allowNull: false
        },
        user_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: "id",
            }
        },
        service_ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'service',
                key:'id'
            }
        }

    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        modelName: 'appointment'
    }

);

module.exports = Appointment;