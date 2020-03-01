const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {

    // check if user exists already
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.send('That email has already been used');

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = router;