const router = require('express').Router();
const { cardCreationValidation, cardIdValidation } = require('../middlewares/joiValidation');

const {
  getCards, createCard, deleteCard, setLike, removeLike,
} = require('../controllers/card');

router.get('/cards', getCards);
router.post('/cards', cardCreationValidation, createCard);
router.delete('/cards/:cardId', cardIdValidation, deleteCard);
router.put('/cards/:cardId/likes', cardIdValidation, setLike);
router.delete('/cards/:cardId/likes', cardIdValidation, removeLike);

module.exports = router;
