export const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    msg: err.message,
  });

  next(err);
};
