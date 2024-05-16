const Service = require('../models/serviceModel');

const servicesData = [
    'Oil Change',
    'Tire Rotations',
    'Brake Fluid Flush',
    'Head Light Replacement',
    'Tire Repair',
    'Transmission Service',
    'Ceramic Coating',
    'Window Tinting',
    'Brake Replacement',
    'Caliper Replacement',
    'A/C Service'
];

const seedServices = async () => {
    await Service.bulkCreate(servicesData);
};

module.exports = seedServices;