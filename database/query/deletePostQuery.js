const dbConnection = require("../db_connection");

const deletePost = (id,userId, cb) => {

  let sql1 = {
    text: "SELECT * FROM posts WHERE id = $1 AND user_id =$2",
    values: [id,userId]
  }

  let sql2 = {
    text: "Delete FROM posts WHERE id = $1 AND user_id =$2",
    values: [id,userId]
  }

  
  


  dbConnection.query(sql1, (err, res) => {
    if (err) {
      cb(err);
    } else {
      if(res.rows.length!==0){
        dbConnection.query(sql2, (err, res) => {
          if (err) {
            cb(err);
          } else {
            cb(null,res.rowCount);
          }
        });
      }
      else{
        cb("You Can Only Delete Your Posts !")
      }

    }
  });
};

module.exports = deletePost;
