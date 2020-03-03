const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    // res.json({
    //     posts: [
    //         {
    //             title: "post 1",
    //             description: "this is the first post"
    //         },
    //         {
    //             title: "post 2",
    //             description: "this is the second post"
    //         }
    //     ]
    // });
    res.send(req.user);
});

module.exports = router;