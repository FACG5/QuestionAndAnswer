const dbConnection = require("../db_connection")

const addComment=(newcomment,userid,postid,cb)=>{
  
        sql = {
          text : "INSERT INTO comments (user_id,post_id,comment_text) VALUES ($1,$2,$3)",
          values:[userid,postid,newcomment.comment_text]
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

