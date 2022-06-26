const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const Forbidden = require('../errors/Forbidden');

module.exports.getCards = (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('req.user', req.user);
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  const id = req.user._id;

  Card.create({ name, link, owner: id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      // eslint-disable-next-line no-console
      console.log(card.owner);
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не существует');
      }
      if (card.owner !== req.user._id) {
        // eslint-disable-next-line no-console
        console.log('req.user._id', req.user._id);
        throw new Forbidden('Нет прав для удаления карточки');
      } else {
        return res.status(200).send({ message: 'Карточка успешно удалена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Запрашиваемая карточка не найдена (некорректный id)'));
      } else if (err.name === 'NotFoundError') {
        next(err);
      } else {
        next(err);
      }
    })
    .catch((err) => next(err));
};

module.exports.setLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не существует');
      } else {
        return res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Запрашиваемая карточка не найдена (некорректный id)'));
      } else if (err.name === 'NotFoundError') {
        next(err);
      } else {
        next(err);
      }
    });
};

module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не существует');
      } else {
        return res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Запрашиваемая карточка не найдена (некорректный id)'));
      } else if (err.name === 'NotFoundError') {
        next(err);
      } else {
        next(err);
      }
    });
};
