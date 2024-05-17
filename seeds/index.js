const sequelize = require("../config/connection.js");
const seedUsers = require("./seedUser.js");
const seedServices = require("./seedServices.js");
const seedCars = require("./seedCar.js");
const seedAppointments = require("./seedAppointment.js");

const seedAll = async () => {
  try {
    // Recreate tables
    await sequelize.sync({ force: true });
    try {
      await seedUsers();
    } catch (err) {
      console.log(err);
    }
    await seedCars();
    await seedAppointments();
    await seedServices();

    console.log("Seeding successful!");
  } catch (err) {
    console.log("Seeding error: ", err);
  } finally {
    process.exit(0);
  }
};

seedAll();
