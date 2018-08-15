const { parse } = require("cookie");
const { sign, verify } = require("jsonwebtoken");
require("env2")("./confing.env");

const createCookie = (userId, cb) => {
  const data = {
    id: userId
  };

  sign(data, SECRET, (err, result) => {
    if (err) return Response.end({ err });
    cb(result);
  });
};

const authChek = cb => {
  if (!requ.headers.cookie) return cb(err);

  const { data } = parse(req.headers.cookie);
  if (!data) return cb(err);

  verify(data, process.env.SECRET, (err, res) => {
    if (err) return cb(err);
    cb(null, res);
  });
};

module.exports = { authChek, createCookie };
