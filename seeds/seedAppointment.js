const Appointment = require('../models/appointmentModel');

const appointmentData = [
    {
        date: '2024-06-15',
        time: '10:00:00',
        user_ID: 1
    },
    {
        date: '2024-06-16',
        time: '11:00:00',
        user_ID: 2
    },
    {
        date: '2024-06-17',
        time: '12:00:00',
        user_ID: 3
    },
    {
        date: '2024-06-18',
        time: '13:00:00',
        user_ID: 4
    },
    {
        date: '2024-06-19',
        time: '14:00:00',
        user_ID: 1
    },
    {
        date: '2024-06-20',
        time: '15:00:00',
        user_ID: 2
    },
    {
        date: '2024-06-21',
        time: '16:00:00',
        user_ID: 3
    },
    {
        date: '2024-06-22',
        time: '17:00:00',
        user_ID: 4
    },
    {
        date: '2024-06-23',
        time: '10:30:00',
        user_ID: 1
    },
    {
        date: '2024-06-24',
        time: '11:30:00',
        user_ID: 2
    }
];

const seedAppointments = async () => {
    try {
        await Appointment.bulkCreate(appointmentData, {
            individualHooks: true,
            returning: true
        });

        console.log('Appointments seeded successfully.');
    } catch (err) {
        console.error('Error seeding appointments:', err);
    }
};

module.exports = seedAppointments;