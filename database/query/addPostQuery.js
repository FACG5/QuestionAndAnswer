const dbConnection = require("../db_connection");

const addPost = (newPost,userid, cb) => {

  let sql = {
    text: "select * from posts where post_text = $1",
    values: [newPost.post_text]
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      if(res.rowCount!==0){
        cb(new Error('An exact post already exists!'))
      }
      else{
        let sql = {
          text: "INSERT INTO posts (user_id,post_text) VALUES ($1,$2)",
          values: [userid, newPost.post_text]
        };
        dbConnection.query(sql,(err,res)=>{
          if(err)
          cb(err)
          else{
            cb(null,res.rowCount);
          }
        })
      }
    }
  });





};






module.exports = addPost;
