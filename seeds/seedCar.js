const Car = require('../models/Car');

const carData = [
    {
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        user_ID: 1
    },
    {
        make: 'Honda',
        model: 'Civic',
        year: 2019,
        user_ID: 2
    },
    {
        make: 'Ford',
        model: 'Mustang',
        year: 2021,
        user_ID: 3
    },
    {
        make: 'Chevrolet',
        model: 'Camaro',
        year: 2018,
        user_ID: 4
    },
    {
        make: 'Nissan',
        model: 'Altima',
        year: 2022,
        user_ID: 1
    },
    {
        make: 'BMW',
        model: '3 Series',
        year: 2020,
        user_ID: 2
    },
    {
        make: 'Audi',
        model: 'A4',
        year: 2017,
        user_ID: 3
    },
    {
        make: 'Mercedes-Benz',
        model: 'C-Class',
        year: 2021,
        user_ID: 4
    }
];

const seedCars = async () => {
    try {
        await Car.bulkCreate(carData, {
            individualHooks: true,
            returning: true
        });

        console.log('Cars seeded successfully.');
    } catch (err) {
        console.error('Error seeding cars:', err);
    }
};

module.exports = seedCars;