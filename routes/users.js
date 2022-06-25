const router = require('express').Router();

const {
  getUsers, getUserById, updateUser, updateAvatar, getInfoAboutMe,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getInfoAboutMe);

router.get('/users/:userId', getUserById);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
