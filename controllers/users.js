const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch(() => {
      throw new BadRequestError('Переданы некорректные данные при создании пользователя');
    })
    .catch((err) => next(err));
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((userList) => res.status(200).send(userList))
    .catch((err) => next(err));
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    // eslint-disable-next-line no-console
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не существует');
      } else {
        return res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Запрашиваемый пользователь не найден (некорректный id)');
      }
      if (err.name === 'NotFoundError') {
        next(err);
      }
    })
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
    .then((updatedUser) => res.status(200).send(updatedUser))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      throw new BadRequestError('Переданы некорректные данные при обновлении профиля');
    })
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
    .then((updatedUser) => res.status(200).send(updatedUser))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      throw new BadRequestError('Переданы некорректные данные при обновлении аватара');
    })
    .catch((err) => next(err));
};
