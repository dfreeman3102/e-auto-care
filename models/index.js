const Car = require('./Car')
const User = require('./User')
const Appointment = require('./Appointment')

// Car.belongsTo(User);

// User.hasOne(Car);

User.hasOne(Appointment);

module.export = {Car, User, Appointment}