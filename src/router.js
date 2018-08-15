const handlers = require("./handler");

const router = (request, response) => {
  const endpoint = request.url; 
  const method = request.method;

  if (endpoint == "/" && method =='GET') {
    handlers.getHome('home',request, response);

  } else if (endpoint.includes("home") && method =='GET') {
      handlers.getHome("static", request, response);

    // authchec((err,res)=>{
    //   if(err)
    //   else
    //   handlers.getHome("static", request, response);

    // })

  } else if (endpoint == "/login" && method =='GET') {
    handlers.getPublicPages("login", request, response);
     
  } else if (endpoint == "/signup" && method =='GET') {
    handlers.getPublicPages("signup", request, response);

  } else if ((endpoint.includes("public/login") || endpoint.includes("public/signup")  || endpoint.includes("public/scripts")) && method =='GET') {
    handlers.getPublicPages("static", request, response);

  } else if (endpoint == "/signup" && method == 'POST') {
    handlers.postSignup(request, response);

  } else if (endpoint == "/login" && method =='POST') {

    handlers.postLogin(request, response);

  } else if (endpoint == "/loadPosts" && method == 'GET') {
    handlers.loadPosts(response);

  } else if (endpoint == "/addPost" && method == 'POST') {
    handlers.addPost(response);

  } else if (endpoint==="/deletePost" && method == 'POST'){
    handlers.deletePost(request,response);

  } else if (endpoint==="/addComment" && method == 'POST'){
    handlers.addComment(request,response);

  } else if (endpoint==="/deleteComment" && method == 'POST'){
    handlers.deleteComment(request,response);
  
  }else {
    response.writeHead(404,{'contentType':'text/html'});
    response.end('<h2>Page Not Found</h2>');
  }
};

module.exports = router;
