exports.send404 = (req, res, next) => {
  res.status(404).send({
    availableRoutes: {
      POST: "/api/users",
    },
  });
};

exports.handle405 = (req, res, next) => {
  res.status(405).send({ msg: "method not allowed" });
};

exports.handleMongoDB_Error = (err, req, res, next) => {
  console.log(err.name, err, "<-------------log EH"); /// dev and test only remove before deployment
  const codes = {
    "11000": { status: 400, message: "User already exists" },
    CastError: {
      status: 400,
      message: "User id is not found",
    },
    SyntaxError: {
      status: 400,
      message: "unexpected string in JSON",
    },
  };
  if (err.code in codes || err.name in codes) {
    const { status, message } = codes[err.code] || codes[err.name];
    res.status(status).send({ message });
  } else {
    next(err);
  }
};

exports.handleCustomError = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.msg });
  } else {
    next(err);
  }
};

exports.handleInternalError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
};
