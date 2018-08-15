const handlers = require("./handler");

const router = (req, res) => {
  const endpoint = req.url;
  console.log(endpoint)
  const method = req.method;
  console.log(method)
  if (endpoint == "/") {
    handlers.handlePage("home", req, res);
  } else if (endpoint.includes("public")) {
    handlers.handlePage("static", req, res);
  }
 else if(endpoint == "/signup" && method =="POST"){
   handlers.addUser(req ,res);
  }
};

module.exports = router;