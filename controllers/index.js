const router = require('express').Router();

const homeRoute = require('./homeRoute');
const appointmentRoute = require('./appointmentRoute');
const apiRoute = require('./api');

router.use('/', homeRoute);
router.use('/services', appointmentRoute);
router.use('/api', apiRoute);

module.exports = router;