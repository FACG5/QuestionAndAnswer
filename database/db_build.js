const fs = require("fs");
const db_connection = require("./db_connection");

const sql = fs.readFileSync(__dirname + "/build.sql").toString();

const db_build = cb =>
  db_connection.query(sql, (err, res) => {
    if (err) cb(err);
    else {
      cb(null, res);
    }
  });


module.exports = db_build;
