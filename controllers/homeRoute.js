const router = require('express').Router();
const { User } = require('../models');

router.get('/', (req, res) => {
  try {
    res.render('auth/home', {
      logged_in: req.session.logged_in,
      pageTitle: 'Home',
      shopName: 'E-Auto-Care',
      year: new Date().getFullYear()
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
