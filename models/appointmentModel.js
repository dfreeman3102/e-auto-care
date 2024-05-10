const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Appointment extends Model { }

Appointment.init(
    {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        service: {
            type: DataTypes.STRING,
            allowNull: false
        },

        date: {
            type: DataTypes.DATEONLY, // stores date only, without time
            allowNull: false
        },

        time: {
            type: DataTypes.TIME,  //stores time only, ideal for managing appointment time
            allowNull: false
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