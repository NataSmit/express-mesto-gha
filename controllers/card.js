const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  const id = req.user._id;

  Card.create({ name, link, owner: id })
    .then((card) => res.status(201).send(card))
    .catch(() => {
      throw new BadRequestError('Переданы некорректные данные при создании карточки');
    })
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.status(200).send({ message: 'Карточка успешно удалена' }))
    .catch(() => {
      throw new NotFoundError(' Карточка с указанным _id не найдена.');
    })
    .catch((err) => next(err));
};

module.exports.setLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
      throw new BadRequestError('Переданы некорректные данные для постановки лайка');
    })
    .catch((err) => next(err));
};

module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
      throw new BadRequestError('Переданы некорректные данные для снятия лайка');
    })
    .catch((err) => next(err));
};
