const router = require('express').Router();
const { User, Service } = require('../models');

router.get('/', async (req, res) => {
  try {

    const serviceData = await Service.findAll();
    const formattedService = serviceData.map((service) => service.get({ plain: true}));
    
    console.log('serviceData' , serviceData);

    // console.log(req.session);
    res.render('auth/home', {
      logged_in: req.session.logged_in,
      pageTitle: 'Home',
      shopName: 'E-Auto-Care',
      year: new Date().getFullYear(),
      service: formattedService
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] }
    });

    const user = userData.get({ plain: true });

    res.render('user/profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If a session exists, redirect to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('auth/login');
});

module.exports = router;
