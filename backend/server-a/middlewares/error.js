/**
 * Error handler middleware.
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
export const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode).json({
    msg: err.message,
  });

  next(err);
};
