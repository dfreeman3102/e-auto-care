const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Service extends Model {}

Service.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        appointment_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'appointment',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        modelName: 'service'
    }
);

module.exports = Service;