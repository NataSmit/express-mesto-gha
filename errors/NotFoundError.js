const {NotFoundErrorCode} = require('./errors')

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = NotFoundErrorCode;
  }
}

module.exports = NotFoundError;