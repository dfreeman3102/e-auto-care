const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        })
    } catch (err) {
        console.error('Signup Error', err);
        res.status(400).json({ message: "An error occurred while signing up." });
    }
});


router.post('/login', async (req, res) => {

    try {
        //find user email that matches posted email
        const userData = await User.findOne({ where: { email: req.body.email } });
        console.log(userData)
        //if incorrect error shows
        if (!userData) {
            res.status(400).json({ message: ' User data Incorrect email or password, try again.' });
            return;
        }
        //verifies posted password with saved password
        const correctPassword = await userData.verifyPassword(req.body.password);

        if (!correctPassword) {
            res.status(400).json({ message: ' password Incorrect email or password, try again.' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Login Successful' });
        });
    } catch (err) {
        console.error('Login Error', err)
        res.status(400).json({ message: "An error occurred while logging in." });
    }
});

router.post('/logout', (req, res) => {
    
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).json({ message: 'Error in destroying session' });
                return;
            }
            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Logout successful' });
        });


    } else {
        res.status(404).json({ message: 'No user to logout' });
    }
})

module.exports = router;