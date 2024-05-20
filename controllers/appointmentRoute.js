const express = require('express')
const router = express.Router()
const {Appointment, User , Service} = require('../models')
const withAuth = require('../utils/auth');

//view for create appointment
router.get('/', withAuth, async (req, res)=>{
    try{
        const serviceData = await Service.findAll();

        const services = serviceData.map((service) => service.get({ plain: true }))
        res.render('appointment/createAppointment', 
            {
                logged_in: req.session,
                services
            }
        );
    }catch(err){
        res.status(500).json({message: 'error accessing appointment', err})
    }
})

//route for logged in user to view appointments
router.get('/all', withAuth, async (req, res)=>{
    try{
        const appointmentsData = await Appointment.findAll({
            where: { user_ID: req.session.user_id},
            include: {
                model: Service,
                attributes: ['name']
            }
        });

        const appointments = appointmentsData.map((appointment) => appointment.get({ plain: true }))
        res.render('appointments', 
            {
                logged_in: req.session.logged_in,
                appointments
            }
        );
    }catch(err){
        res.status(500).json({message: 'error accessing appointment', err})
    }
})

//create a new appointment with selected service
router.post('/create', withAuth, async(req, res)=>{
    try{
        const { service_ID, appointmentDate } = req.body
    
    const user = await User.findByPk(req.session.user_id)
    if(!user){
        return res.status(404).json({message:'User not found'})
    }
    const appointment = await Appointment.create({
        user_id: req.session.user_id,
        date: appointmentDate.split('T')[0],
        time: appointmentDate.split('T')[1],
        service_ID: service_ID
    })
    if (service_ID){
        const service = await Service.findByPk(service_ID)
        if(!service){
            return res.status(404).json({ message:'selected service not found'})
        }
    }
    res.status(201).json(appointment)
    } catch(err){
        console.error('error creating appointment :', err)
        res.status(500).json({ message: "Internal service error"})
    }
})
module.exports = router;
