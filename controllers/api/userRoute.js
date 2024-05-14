const router = require('express').Router();
const {User} = require('../models/userModel.js');

router.post('/login', async (req, res) => {
    try{
        //find user email that matches posted email
        const userData = await User.findOne({ where: { email: req.body.email }});
        //if incorrect error shows
        if(!userData){
            res.status(400).json({message: 'Incorrect email or password, try again.'});
            return;
        }
        //verifies posted password with saved password
        const correctPassword = await userData.verifyPassword(req.body.password);

        if(!correctPassword) {
            res.status(400).json({message: 'Incorrect email or password, try again.'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({user: userData, message: 'Login Successful'});
        });
    } catch (err) {
        console.error('Login Error', err)
        res.status(400).json({message: "An error occurred while logging in."});
    }
});

router.post('/logout', (req, res) => {
    if(req.session.logged_in){
        req.session.destroy(() => {
            res.status(204).json({message: 'Logout Successful'});
        });
    } else {
        res.status(404).json({message: 'No user to logout'});
    }
})

module.exports = router;