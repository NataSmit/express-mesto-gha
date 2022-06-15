const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .catch(() => {
      throw new BadRequestError('Переданы некорректные данные при создании пользователя');
    })
    .then((user) => res.status(201).send(user))
    .catch((err) => next(err));
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((userList) => res.status(200).send(userList))
    .catch((err) => next(err));
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .catch(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => next(err));
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      throw new BadRequestError('Переданы некорректные данные при обновлении профиля');
    })
    .then((updatedUser) => res.status(200).send(updatedUser))
    .catch((err) => next(err));
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      throw new BadRequestError('Переданы некорректные данные при обновлении аватара');
    })
    .then((updatedUser) => res.status(200).send(updatedUser))
    .catch((err) => next(err));
};
