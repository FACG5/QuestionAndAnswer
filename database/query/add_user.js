const dbConnection =require("./../db_connection.js");

const signUpQuery= (email,password,nickname,cb)=>{
  

    const sql = {
        text:"INSERT INTO users (email,pass,nickname) VALUES ($1,$2,$3) RETURNING *",
        values:[email,password,nickname]
    }
    dbConnection.query(sql,(err, result)=>{
        if(err){
            console.log('err',err);
            
        return cb(err);

        }else{
            console.log('result',result);
            
            cb(null,result)
        }
    })
}
 module.exports=signUpQuery
 
