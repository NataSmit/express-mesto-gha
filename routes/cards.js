const router = require('express').Router();
const {cardCreationValidation} = require('../middlewares/joiValidation');

const {
  getCards, createCard, deleteCard, setLike, removeLike,
} = require('../controllers/card');

router.get('/cards', getCards);
router.post('/cards', cardCreationValidation, createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', setLike);
router.delete('/cards/:cardId/likes', removeLike);

module.exports = router;
