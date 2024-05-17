const Service = require('../models/serviceModel');

const servicesData = [
    {
        name:'Oil Change'
    },
    {
        name: 'Tire Rotations'
    },{
        name: 'Brake Fluid Flush'
    },
    {
        name: 'Head Light Replacement'
    },
    {
        name: 'Tire Repair'
    },
    {
        name: 'Transmission Service'
    },
    {
        name: 'Ceramic Coating'
    },
    {
        name: 'Window Tinting'
    },
    {
        name: 'Brake Replacement'
    },
    {
        name: 'Caliper Replacement'
    },
    {
        name: 'A/C Service'
    }
];

const seedServices = async () => {
    await Service.bulkCreate(servicesData);
};

module.exports = seedServices;