const router = require('express').Router();

const { createUser, getUsers, getUserById } = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUserById);

router.post('/users', createUser);

module.exports = router;