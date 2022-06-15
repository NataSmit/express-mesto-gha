const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./routes/users');
const routerCards = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,

});

app.use((req, res, next) => {
  req.user = {
    _id: '62a7728ba6402e279fe91c81', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/', router);

app.use('/', routerCards);

// app.use((err, req, res, next) => {
//  console.error(err.stack);
//  res.status(500).send('Something broke!');
// });

app.use((err, req, res, next) => {

  if (err.statusCode) {
    res.status(err.statusCode).send({ err, message: err.message });
  } else {
    res.status(err.statusCode = 500).send({ err, code: err.statusCode, message: 'Внутренняя ошибка сервера' })
  }

  next();
});

//app.use((err, req, res, next) => {
//  const errorCode = err.statusCode || 500;
//  res.status(errorCode).send({ message: errorCode === 500 ? 'Произошла внутренняя ошибка сервера' : err.message, err });
//
//  next();
//});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
