const router = require('express').Router();
const { cardCreationValidation, idValidation } = require('../middlewares/joiValidation');

const {
  getCards, createCard, deleteCard, setLike, removeLike,
} = require('../controllers/card');

router.get('/cards', getCards);
router.post('/cards', cardCreationValidation, createCard);
router.delete('/cards/:cardId', idValidation, deleteCard);
router.put('/cards/:cardId/likes', idValidation, setLike);
router.delete('/cards/:cardId/likes', idValidation, removeLike);

module.exports = router;
