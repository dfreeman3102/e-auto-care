//Import models
const User = require('./userModel');
const Appointment = require('./appointmentModel');
const Car = require('./carModel');
const Service = require('./serviceModel');

//associations between various tables

//Users can have many cars
User.hasMany(Car, {
    foreignKey: 'user_ID',
    onDelete: 'CASCADE' // this allows the car of a deleted user to be deleted too
}); 

//Cars belong to users
Car.belongsTo(User, {
    foreignKey: 'user_ID',
});

//Users can hame many appointments
User.hasMany(Appointment, {
    foreignKey: 'user_ID',
    onDelete: 'CASCADE' // delete appointments of a deleted user
});

//Appointments belong to a User
Appointment.belongsTo(User, {
    foreignKey: 'user_ID',
});

Appointment.hasOne(Service, {
    foreignKey: 'service_ID',
    onDelete: 'CASCADE'
});

Service.belongsTo(Appointment, {
    foreignKey: 'service_ID',
    onDelete: 'CASCADE'
});


module.exports= {
    User,
    Appointment,
    Car,
    Service
};