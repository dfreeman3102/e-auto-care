//Import models
const User = require('./userModel');
const Appointment = require('./appointmentModel');
const Car = require('./carModel');

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


//Car can have many appointments
Car.hasMany(Appointment, {
    foreignKey: 'car_ID',
    onDelete: "CASCADE" // delete appointments of a car when the car is deleted
});

//Appointments belongs to Cars
Appointment.belongTo(Car, {
    foreignKey: 'cars_ID'
});

module.exports= {
    User,
    Appointment,
    Car
};