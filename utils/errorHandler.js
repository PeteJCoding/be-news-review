exports.handlePSQLErrors = (err, req, res, next) => {
  console.error("Handling PSQL Error:", err);
  const errorCodes = ["22P02", "42703", "23502"];
  if (errorCodes.includes(err.code)) {
    res.status(400).json({ msg: "Bad Request" });
  } else if (err.code === "23503") {
    res.status(404).json({ msg: "Page Not Found" });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ msg: err.msg || "Page Not Found" });
  } else {
    next(err);
  }
};

exports.methodNotAllowed = (req, res, next) => {
  res.status(405).json({ msg: "Method Not Allowed" });
};

exports.handle500 = (err, req, res, next) => {
  console.error("Handling Internal Server Error:", err);
  res.status(500).json({ msg: "Internal Server Error" });
};
  