const express = require('express')
const router = express.Router()
const {Appointment, User , Service} = require('../models')
const withAuth = require('../utils/auth');

//get all appointments
router.get('/', withAuth, async (req, res)=>{
    try{
        const serviceData = await Service.findAll();

        const services = serviceData.map((service) => service.get({ plain: true }))
        res.render('appointment/createAppointment', 
            {services}
        );
    }catch(err){
        res.status(500).json({message: 'error accessing appointment', err})
    }
})

//create a new appointment with selected service
router.post('/', async(req, res)=>{
    try{
        const {userId, carId, appointmentDate, selectedServiceId} = req.body
    
    const user = await User.findByPk(userId)
    if(!user){
        return res.status(404).json({message:'User not found'})
    }
    const appointment = await Appointment.create({
        user_id: userId,
        car_id: carId,
        appointment_date: appointmentDate
    })
    if (selectedServiceId){
        const service = await Service.findByPk(selectedServiceId)
        if(!service){
            return res.status(404).json({ message:'selected service not found'})
        }
        await appointment.addService(service)
    }
    res.status(201).json(appointment)
    } catch(err){
        console.error('error creating appointment :', err)
        res.status(500).json({ message: "Internal service error"})
    }
})
module.exports = router;
