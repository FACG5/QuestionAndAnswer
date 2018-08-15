const dbConnection = require("../db_connection");

const deletePost = (id, cb) => {
  let sql1 = {
    text: "DELETE FROM comments WHERE post_id =$1",
    values: [id]
  };
  let sql2 = {
    text: "DELETE FROM posts WHERE id =$1",
    values: [id]
  };

  dbConnection.query(sql1, (err, res) => {
    if (err) {
      cb(err);
    } else {
      dbConnection.query(sql2, (err, res) => {
        if (err) {
          cb(err);
        } else {
          cb(null, res.rowCount);
        }
      });
    }
  });
};

module.exports = deletePost;
