const dbConnection = require("../db_connection")

const dbCheckEmail=(email,cb)=>{
  
        sql = {
          text : "select * from users where email = $1",
          values:[email]
        } 
       
        dbConnection.query(sql,(err,res)=>{
            if(err){
                cb(err)
            }
            else{
              cb(null,res.rows)
            }
        })


      
 

}
module.exports = dbCheckEmail;

