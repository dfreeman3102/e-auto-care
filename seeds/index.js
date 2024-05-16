const sequelize = require('../config/connection.js');
const { seedUsers } = require('../seeds/seedUser.js');
const { seedServices } = require('../seeds/seedServices.js');
const { seedCars } = require('../models/carModel.js');
const { seedAppointments } = require('../models/appointmentModel.js');

const seedAll = async () => {
    try{
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        
        // Drop tables in the correct order
        await sequelize.query('DROP TABLE IF EXISTS appointment');
        await sequelize.query('DROP TABLE IF EXISTS service');
        await sequelize.query('DROP TABLE IF EXISTS car');
        await sequelize.query('DROP TABLE IF EXISTS user');
        
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

        // Recreate tables
        await sequelize.sync ({ force: true });
        await seedUsers;
        await seedCars;
        await seedAppointments;
        await seedServices;
        
        console.log('Seeding successful!')        
    } catch (err) {
        console.log('Seeding error: ', err);
    } finally {
        process.exit(0);
    }
};

seedAll();