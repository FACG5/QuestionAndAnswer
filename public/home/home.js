container = document.getElementById("postscontainer");
signout = document.getElementById("signout");
// questioninput = document.getElementById('questioninput');
// addpostbtn = document.getElementById("addpostbtn");



window.onload = e => {
  container.innerHTML = "";

  refreshPage();
};

signout.onclick = e => {
  request("GET", "/signout", "", (err, res) => {
    if (err) console.log(err.message);
    else window.location = "/login";
  });
};


refreshPage = ()=>{
    container.innerHTML = "";
    request("GET", "/loadPosts", "", (err,res)=>{
        if(err)
        console.log(err.message);
        else
        renderposts(res);
        
    });
}


renderposts = res => {
  res.posts.forEach((element, i) => {
    if (element.post_text !== null && element.post_text !== "") {
      const post = document.createElement("div");
      post.classList.add("post");
      const postdeletebtn = document.createElement("button");
      postdeletebtn.textContent = "Delete Question";
      postdeletebtn.classList.add("Delete");

      postdeletebtn.onclick = e => {
        request("POST", "/deletePost", element.id, (err, res) => {
          if (err) console.log(err.message);
          else refreshPage();
        });
      };

      const questionp = document.createElement("p");
      questionp.textContent = res.posts[i].post_text;
      questionp.classList.add("Question");
      const commentsul = document.createElement("ul");

      res.comments.forEach((element, j) => {
        if (element.post_id == res.posts[i].id) {
          const commentli = document.createElement("li");
          commentli.textContent = element.comment_text;
          const commentdeletebtn = document.createElement("button");
          commentdeletebtn.textContent = "delete comment";
          commentdeletebtn.classList.add("DeleteButton");

          commentdeletebtn.onclick = e => {
            request("POST", "/deleteComment", element.id, (err, res) => {
              if (err) return  swal(err.message,"","error");
              swal("Deleted","","success").then(value=>{
                refreshPage();
              })
              
            });
          };
          commentli.appendChild(commentdeletebtn);
          commentsul.appendChild(commentli);
        }
      });
      const commenttextarea = document.createElement("textarea");
      commenttextarea.setAttribute("rows", "2");
      commenttextarea.setAttribute("cols", "64");
      const commentaddbtn = document.createElement("button");
      commentaddbtn.textContent = "Add Comment";

      commentaddbtn.classList.add("AddComment");

      commentaddbtn.dataset.id = element.id;
      commentaddbtn.onclick = e => {
        var obj = {
          post_id: e.target.dataset.id,
          comment_text: commenttextarea.value
        };
        request("POST", "/addComment", JSON.stringify(obj), (err, res) => {
          if (err) console.log(err.message);
          else refreshPage();
        });
      };
      post.appendChild(postdeletebtn);
      post.appendChild(questionp);
      post.appendChild(commenttextarea);
      post.appendChild(commentaddbtn);
      post.appendChild(commentsul);

      container.appendChild(post);
    }
  });
};
