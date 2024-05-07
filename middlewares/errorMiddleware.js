const errorMiddleware = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({ "error":true, "message": err.message || "Internal Server Error" });
};

module.exports = errorMiddleware;