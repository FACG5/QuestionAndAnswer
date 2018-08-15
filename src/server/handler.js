const fs = require("fs");
const path = require("path");
var bcrypt = require('bcryptjs');

handlePage = (target, req, res) => {
  const reqPage = {
    home: "public/home.html",
    static: req.url
  };
  fs.readFile(path.join(__dirname, "..","..", reqPage[target]), (err, file) => {
    res.writeHead(200);
    if (err) throw err;
    else {
      res.end(file);
    }
  });
};
 addUser = (req, res)=>{
  let newUser ="";
     req.on("data",(chunk)=>{
         newUser += chunk;
     });
     req.on("end",()=>{
         const userObj = JSON.parse(newUser) 
         console.log(userObj)
         const {nameValue,emailValue,passwordValue} = userObj;
        bcrypt.hash(passwordValue ,10 ,(err,hash)=>{
            
        }) 
     })
     
 }


module.exports ={
    handlePage ,
    addUser
}