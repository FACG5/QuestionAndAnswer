const { parse } = require("cookie")
const { sign , verify} = require('jsonwebtoken')
require("env2")("./confing.env")




const email = email ;
const password = password ;

checkEmailLogin(email,password,(err,userResult)=>{

    if (!userResult.email) return Response.end({err:"Email Not Found"})
bcrypt.compare(password,userResult.pass,(err,res)=>{
if(err)return Response.end({err})
    if(res===false) return Response.end({err:"Wrong Password !"})

    const data = {
        id : userResult.id

    };



    sign(data,SECRET,(err,result)=>{

        if(err) return Response.end({err})
        Response.writeHead(302,{'Location':'/Home' , 'Set-Cookie':`data=${result};httpOnly;Max-Age=90000000`});



    })

})
}) 

const authChek = (cb)=>{

    if(!requ.headers.cookie) return cb(err);

    const {data} =  parse(req.headers.cookie)
if (!data) return cb(err);

verify(data,process.env.SECRET,(err,res)=>{

    if(err)  return cb(err);

    cb(null,res)
       
    
    
})

}

const rd