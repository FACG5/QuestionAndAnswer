const fs = require("fs");
const path = require("path");
const getPostsQuery = require("../database/query/getPostsQuery");
const addPostQuery = require("../database/query/addPostQuery");
const deletePostQuery = require("../database/query/deletePostQuery")
const addCommentQuery = require("../database/query/addCommentQuery")
const deleteCommentQuery = require("../database/query/deleteCommentQuery")
const cookieAndAuth = require("./cookieAndAuth")
const dbCheckEmail = require("../database/query/dbCheckEmail")
getPublicPages = (target, req, res) => {
  const reqPage = {
    signup: "public/signup/signup.html",
    login: "public/login/login.html",
    static: req.url
  };
const filePath = path.join(__dirname,"..", reqPage[target]);
console.log(filePath+55);

  fs.readFile(filePath,(err, file) => {
    res.writeHead(200);

    if (err) throw err;
    else {
      res.end(file);
    }
  });
};

getHome = (target, req, res) => {
  const reqPage = {
    home: "public/home/home.html",
    static: req.url
  };
  fs.readFile(path.join(__dirname, "..", reqPage[target]), (err, file) => {
    res.writeHead(200);

    if (err) throw err;
    else {
      res.end(file);
    }
  });
};


const postSignup = (request, response) => {

};

const postLogin = (request, response) => {
  const userDate = ''
  request.on("data",chunk=>{
    userDate+=chunk;
  })
  request.on('end',()=>{

    userDate= JSON.parse(userDate);
    dbCheckEmail(userDate.email,(err,dbResult)=>{

      if (!dbResult.email) return response.end({err:"Email Not Found"})
  bcrypt.compare(userDate.password,dbResult.pass,(err,res)=>{
  if(err)return response.end({err})
      if(res===false) return response.end({err:"Wrong Password !"})
      cookieAndAuth.createCookie(dbResult.id,(err,token)=>{
if(err) return response.end({err});
        response.writeHead(302,{'Location':'/Home' , 'Set-Cookie':`data=${token};httpOnly;Max-Age=90000000`});
      })
  
  
  })
  }) 
  })

};



const loadPosts = response => {
  getPostsQuery((err, res) => {
    if (err) {
      response.end(JSON.stringify({'err':{'message':err.message}}));
    } else {
      response.end(JSON.stringify({'err':null,'result':{posts:res.postsres.rows,comments:res.commentsres.rows}}))
    }
  });
};

const addPost = (request, response) => {
  let newpost = ""
  request.on("data", chunk => {
    newpost += chunk;
  })
  request.on("end", () => {
    newpost = JSON.parse(newpost);
    addPostQuery(newpost, (err, res) => {
      if (err) {
        response.end(JSON.stringify({'err':{'message':err.message}}));
      }
      else {
        response.end(JSON.stringify({'err':null,'result':{'message':res + ' records was added successfuly'}}));
      }
    })

  })

}

const deletePost = (request, response) => {
  let deletedpostid = ""
  request.on("data", chunk => {
    deletedpostid += chunk;
  })
  request.on("end", () => {
      deletePostQuery(deletedpostid, (err, res) => {
        if (err) {
          response.end(JSON.stringify({'err':{'message':err.message}}))
        }
        else {
          if(Number(res)===0){
            response.end(JSON.stringify(JSON.stringify({'err':null,'result':{'message':'Post Not Found !'}})));
          }else{
            response.end(JSON.stringify({'err':null,'result':{'message':res +' records was deleted successfuly'}}));
          }
        }
    })
  })
}

const addComment = (request, response) => {
  let newcomment = ""
  request.on("data", chunk => {
    newcomment += chunk;
  })
  request.on("end", () => {
    newcomment = JSON.parse(newcomment);
    addCommentQuery (newcomment, (err, res) => {
      if (err) {
        response.end(JSON.stringify({'err':{'message':err.message}}))
      }
      else {
        response.end(JSON.stringify({'err':null,'result':{'message':res + ' records was added successfuly'}}));
      }
    })

  })

}

const deleteComment = (request, response) => {
  let deletedcommentid = ""
  request.on("data", chunk => {
    deletedcommentid += chunk;
  })
  request.on("end", () => {
    deleteCommentQuery(Number(deletedcommentid), (err, res) => {
      if (err) {
        response.end(JSON.stringify({'err':{'message':err.message}}))
      }
      else {
      if(res==0){
        response.end(JSON.stringify({'err':null,'result':{'message':'Comment Not Found !'}}));
      }
      else{
        response.end(JSON.stringify({'err':null,'result':{'message':res + ' records was deleted successfuly'}}));
      }
    }
    })

  })

}


module.exports = { 
    getHome,
    getPublicPages,
    postSignup,
    postLogin,
    loadPosts,
    addPost,
    deletePost,
    addComment,
    deleteComment };
