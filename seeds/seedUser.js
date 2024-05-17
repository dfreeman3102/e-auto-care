const User = require('../models/userModel');
const argon2 = require('argon2');


const userData = [
    {
        id: 1,
        username: "dfreeman3102",
        email: "david@gmail.com",
        password: "password1",
        firstName: "David",
        lastName: "Freeman"
    },
    {
        id: 2,
        "username": "rmolu123",
        "email": "ralph@gmail.com",
        "password": "password2",
        "firstName": "Ralph",
        "lastName": "Molu"
    },
    {
        "id": 3,
        "username": "aprince321",
        "email": "armoni@gmail.com",
        "password": "password3",
        "firstName": "Armoni",
        "lastName": "Prince"
    },
    {
        "id": 4,
        "username": "iharalalka",
        "email": "ian@gmail.com",
        "password": "password4",
        "firstName": "Ian",
        "lastName": "Haralalka"
    }
];

const seedUsers = async () => {
    try {
        // Hash password before adding to the database
        for (const user of userData) {
            user.password = await argon2.hash(user.password);
        }
        await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true
        });

        console.log('Users seeded successfully.');
    } catch (err) {
        console.error('Error seeding users:', err);
    }
};

module.exports = seedUsers;