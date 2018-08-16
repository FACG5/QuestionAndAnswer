const dbConnection = require("../db_connection")

const addComment=(newcomment,userid,cb)=>{
  let post_id = newcomment.post_id;
  let comment_text = newcomment.comment_text;
        sql = {
          text : "INSERT INTO comments (user_id,post_id,comment_text) VALUES ($1,$2,$3)",
          values:[userid,post_id,comment_text]
        } 
       
        dbConnection.query(sql,(err,res)=>{
            if(err){
                cb(err)
            }
            else{
              cb(null,res.rowCount)
            }
        })


      
 

}
module.exports = addComment;

