const dbConnection = require("../db_connection")

const addComment=(newcomment,cb)=>{
  
        sql = {
          text : "INSERT INTO comments (user_id,post_id,comment_text) VALUES ($1,$2,$3)",
          values:[2,newcomment.post_id,newcomment.comment_text]
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

