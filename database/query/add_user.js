const dbConnection =require("./../db_connection.js");

const signUpQuery= (name,email,password,cb)=>{
  

    const sql = {
        text:"INSERT INTO users (nickname,email,pass) VALUES ($1,$2,$3)",
        values:[name,email,password]
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
 
