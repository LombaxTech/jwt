const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.head('auth-token');
    if (!token) res.status(401).send('access denied');

    try {
        const verified = jwt.verify(token, 'whuwhwdd');
        req.user = verified;
    } catch (error) {
        res.status(400).send('invalid token');
    }
}