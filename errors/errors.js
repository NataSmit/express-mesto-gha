const BadRequestErrorCode = 400;
const NotFoundErrorCode = 404;
const InternalServerErrorCode = 500

//class ValidationError extends Error {
//  constructor(message) {
//    super(message);
//    this.name = "ValidationError";
//    this.statusCode = 400;
//  }
//}
//
//throw new ValidationError("Произошла ошибка валидации")

module.exports = {
  BadRequestErrorCode,
  NotFoundErrorCode,
  InternalServerErrorCode,
}

