const dbConnection = require("../db_connection");

const dbCheckEmail = (email, cb) => {
  console.log(email);

  sql = {
    text: "select * from users where email = $1",
    values: [email]
  };

  console.log(sql);

  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};
module.exports = dbCheckEmail;
