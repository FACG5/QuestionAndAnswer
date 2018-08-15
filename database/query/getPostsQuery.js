const db_Connection = require("../db_connection");
const getPosts = cb => {
  db_Connection.query(
    "select * from posts",
    (err, postsres) => {
      if (err) {
        cb(err);
      } else {
        let sql = {
          text: "SELECT * FROM comments"
        };
        db_Connection.query(sql, (err, commentsres) => {
          if (err) {
            cb(err);
          } else {
            cb(null, { postsres, commentsres });
          }
        });
      }
    });
};

module.exports = getPosts;
