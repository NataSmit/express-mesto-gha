const router = require('express').Router();

const { createUser } = require('../controllers/users');

//router.get('/users', (req, res) => {
//  User.find({});
//})
//
//router.get('/users/:userId', (req, res) => {
//  User.findById(req.params.id)
//    .then((user) => res.send({data: user}))
//})

router.post('/users', createUser);

module.exports = router;