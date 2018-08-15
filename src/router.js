const handlers = require("./handler");
const checkAuth = require("./cookieAndAuth");

const router = (request, response) => {
  checkAuth.authChek(request, (errauth, token) => {
    const endpoint = request.url;
    const method = request.method;

    if (endpoint == "/" && method == "GET") {
      if (errauth) {
        response.writeHead(302, { location: "/login" });
        response.end();
      } else {
        handlers.getHome("home", token, request, response);
      }
    } else if (endpoint.includes("home") && method == "GET") {
      if (errauth) {
        response.writeHead(302, { location: "/login" });
        response.end();
      } else {
        handlers.getHome("static", token, request, response);
      }
    } else if (endpoint == "/login" && method == "GET") {
      handlers.getPublicPages("login", request, response);
    } else if (endpoint == "/signup" && method == "GET") {
      handlers.getPublicPages("signup", request, response);
    } else if (
      (endpoint.includes("public/login") ||
        endpoint.includes("public/signup") ||
        endpoint.includes("public/scripts")) &&
      method == "GET"
    ) {
      handlers.getPublicPages("static", request, response);
    } else if (endpoint == "/signup" && method == "POST") {
      handlers.postSignup(request, response);
    } else if (endpoint == "/login" && method == "POST") {
      handlers.postLogin(request, response);
    } else if (endpoint == "/loadPosts" && method == "GET") {
      if (errauth) {
        response.writeHead(302, { location: "/login" });
        response.end();
      } else {
        handlers.loadPosts(response);
      }
    } else if (endpoint == "/addPost" && method == "POST") {
      if (errauth) {
        response.writeHead(302, { location: "/login" });
        response.end();
      } else {
        handlers.addPost(response);
      }
    } else if (endpoint === "/deletePost" && method == "POST") {
      if (errauth) {
        response.writeHead(302, { location: "/login" });
        response.end();
      } else {
        handlers.deletePost(request, response);
      }
    } else if (endpoint === "/addComment" && method == "POST") {
      if (errauth) {
        response.writeHead(302, { location: "/login" });
        response.end();
      } else {
        handlers.addComment(request, response);
      }
    } else if (endpoint === "/deleteComment" && method == "POST") {
      if (errauth) {
        response.writeHead(302, { location: "/login" });
        response.end();
      } else {
        handlers.deleteComment(request, response);
      }
    }else if(endpoint === "/signout" && method == "GET") {
      response.writeHead(200, { "Set-Cookie":"data=0;httpOnly;Max-Age=0" });
      response.end(JSON.stringify({
        err: null,
        result: { message: "Signed out successfuly" }
      }));
    } else {
      response.writeHead(404, { contentType: "text/html" });
      response.end("<h2>Page Not Found</h2>");
    }
  });
};

module.exports = router;
