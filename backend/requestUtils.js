exports.send200 = (res, msg, data) => {
  return res.send({
    status: 200,
    message: msg || "Success.",
    data: data || {},
  });
};

exports.send201 = (res, msg, data) => {
  return res.send({
    status: 201,
    message: msg || "Successfully created.",
    data: data || {},
  });
};

exports.send401 = (res, msg, data) => {
  return res.send({
    status: 401,
    message: msg || "Unauthorized.",
    data: data || {},
  });
};

exports.send500 = (res, msg, data) => {
  return res.send({
    status: 500,
    message: msg || "Something went wrong.",
    data: data || {},
  });
};
