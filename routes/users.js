const router = require('express').Router();
const { updateUserInfoValidation, updateAvatarValidation } = require('../middlewares/joiValidation');

const {
  getUsers, getUserById, updateUser, updateAvatar, getInfoAboutMe,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getInfoAboutMe);

router.get('/users/:userId', getUserById);

router.patch('/users/me', updateUserInfoValidation, updateUser);

router.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
