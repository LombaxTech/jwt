const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {

    // check if user exists already
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.send('That email has already been used');

    // hashing passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }

});

router.post('/login', async (req, res) => {

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.send('Email doesnt exist');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('invalid password');

    const token = jwt.sign({ _id: user._id }, 'whuwhwdd');
    res.header('auth-token', token).send(token);

})

module.exports = router;