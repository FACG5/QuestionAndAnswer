const fs = require("fs");
const path = require("path");
const getPostsQuery = require("../database/query/getPostsQuery");
const addPostQuery = require("../database/query/addPostQuery");
const deletePostQuery = require("../database/query/deletePostQuery");
const addCommentQuery = require("../database/query/addCommentQuery");
const deleteCommentQuery = require("../database/query/deleteCommentQuery");
const cookieAndAuth = require("./cookieAndAuth");
const dbCheckEmail = require("../database/query/dbCheckEmail");
const bcrypt = require("bcryptjs");
const addUserQuery = require("../database/query/add_user");

getPublicPages = (target, req, res) => {
  const reqPage = {
    signup: "public/signup/signup.html",
    login: "public/login/login.html",
    static: req.url
  };
  const filePath = path.join(__dirname, "..", reqPage[target]);
  console.log(filePath + 55);

  fs.readFile(filePath, (err, file) => {
    res.writeHead(200);

    if (err) throw err;
    else {
      res.end(file);
    }
  });
};

getHome = (target, token, req, res) => {
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
  let newUser = "";
  request.on("data", chunk => {
    newUser += chunk;
  });

  request.on("end", () => {
    const userObj = JSON.parse(newUser);
    const { nameValue, emailValue, passwordValue } = userObj;
    bcrypt.hash(passwordValue, 10, (err, hash) => {
      addUserQuery(emailValue, hash, nameValue, (err, result) => {
        if (err) {
          response.end(JSON.stringify({ err: err.detail }));
        } else {
          response.end(JSON.stringify({ err: null, msg: "suc" }));
        }
      });
    });
  });
};

const postLogin = (request, response) => {
  let userDate = "";
  request.on("data", chunk => {
    userDate += chunk;
  });
  request.on("end", () => {
    userDateParse = JSON.parse(userDate);
    if(userDateParse.email.trim().length===0 || userDateParse.password.trim().length===0)
    return response.end(JSON.stringify({ err: "Please ! Enter Your Email/Password" }));
    dbCheckEmail(userDateParse.email, (err, dbResult) => {
      if (!dbResult[0])
        return response.end(JSON.stringify({ err: "Email Not Found" }));
      bcrypt.compare(userDateParse.password, dbResult[0].pass, (err, res) => {
        if (err) return response.end(JSON.stringify({ err }));
        if (res === false)
          return response.end(JSON.stringify({ err: "Wrong Password !" }));
        cookieAndAuth.createCookie(dbResult[0].id, (err, token) => {
          if (err) return response.end(JSON.stringify({ err }));

          response.setHeader(
            "Set-Cookie",
            `data=${token};httpOnly;Max-Age=90000000`
          );

          response.end(JSON.stringify({ err: null, result: "Login" }));
        });
      });
    });
  });
};

const loadPosts = response => {
  getPostsQuery((err, res) => {
    if (err) {
      response.end(JSON.stringify({ err: { message: err.message } }));
    } else {
      response.end(
        JSON.stringify({
          err: null,
          result: { posts: res.postsres.rows, comments: res.commentsres.rows }
        })
      );
    }
  });
};

const addPost = (request, response, userid) => {
  let newpost = "";
  request.on("data", chunk => {
    newpost += chunk;
  });
  request.on("end", () => {
    newpost = JSON.parse(newpost);
    console.log(newpost.trim().length);
    
    if (newpost.trim().length>0) {      
      addPostQuery(newpost, userid, (err, res) => {
        if (err) {
          response.end(JSON.stringify({ err: err.message }));
        } else {
          response.end(
            JSON.stringify({
              err: null,
              result: "Your post was added successfuly" 
            })
          );
        }
      });
    } else {
      response.end(
        JSON.stringify({
          err: "You Cant Add Empty Post !"
        })
      );
    }
  });
};

const deletePost = (request, response,id) => {
  let deletedpostid = "";
  request.on("data", chunk => {
    deletedpostid += chunk;
  });
  request.on("end", () => {
    deletePostQuery(deletedpostid,id, (err, res) => {
      if (err) {
        response.end(JSON.stringify({ err }));
      } else {
        if (Number(res) === 0) {
          response.end(
            JSON.stringify(
              JSON.stringify({
                err: null,
                result: { message: "Post Not Found !" }
              })
            )
          );
        } else {
          response.end(
            JSON.stringify({
              err: null,
              result:" records was deleted successfuly" 
            })
          );
        }
      }
    });
  });
};

const addComment = (request, response, userid) => {
  let newcomment = "";
  request.on("data", chunk => {
    newcomment += chunk;
  });
  request.on("end", () => {
    newcomment = JSON.parse(newcomment);
    addCommentQuery(newcomment, userid, (err, res) => {
      if (err) {
        response.end(JSON.stringify({ err: { message: err.message } }));
      } else {
        response.end(
          JSON.stringify({
            err: null,
            result: { message: res + " records was added successfuly" }
          })
        );
      }
    });
  });
};

const deleteComment = (request, response, userid) => {
  let deletedcommentid = "";
  request.on("data", chunk => {
    deletedcommentid += chunk;
  });
  request.on("end", () => {
    deleteCommentQuery(Number(deletedcommentid), userid, (err, res) => {
      if (err) {
        response.end(JSON.stringify({ err: { message: err.message } }));
      } else {
        if (res == 0) {
          response.end(
            JSON.stringify({
              err: null,
              result: { message: "Comment Not Found !" }
            })
          );
        } else {
          response.end(
            JSON.stringify({
              err: null,
              result: { message: res + " records was deleted successfuly" }
            })
          );
        }
      }
    });
  });
};

module.exports = {
  getHome,
  getPublicPages,
  postSignup,
  postLogin,
  loadPosts,
  addPost,
  deletePost,
  addComment,
  deleteComment
};
