const express = require("express");
const router = express.Router();

//route handling
const appintmentRoutes = require('./appointmentRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

module.exports = router;