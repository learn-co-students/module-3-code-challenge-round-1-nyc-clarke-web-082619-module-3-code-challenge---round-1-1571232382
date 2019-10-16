document.addEventListener("DOMContentLoaded", () => {
  console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

  let imageId = 3699; //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

  const likeURL = `https://randopic.herokuapp.com/likes/`;

  const commentsURL = `https://randopic.herokuapp.com/comments/`;
  //===================================================================================

  //grab what I need
  imageCard = document.getElementById("image_card");
  // console.log(imageCard);
  likesContainer = document.getElementById("likes");
  commentsContainer = document.getElementById("comments");
  likeButton = document.getElementById("like_button");
  commentForm = document.getElementById("comment_form");
  commentInput = document.getElementById("comment_input");
  //event handlers
  const renderImages = data => {
    //grab interesting data
    id = data.id;
    url = data.url;
    name = data.name;
    likeCount = data.like_count;
    // console.log(id, url, name, likeCount);

    //fill correct things with data
    // console.log(imageCard.children);
    imgContainer = imageCard.children[0];
    nameContainer = imageCard.children[1];

    imgContainer.src = url;
    nameContainer.innerText = name;
    likesContainer.innerText = likeCount;
    likeButton.dataset.image_id = id;
    //deal with comments
    data.comments.forEach(comment => {
      li = document.createElement("LI");
      deleteBtn = document.createElement("BUTTON");
      deleteBtn.innerText = "Trash this comment my man";
      deleteBtn.id = "delete-btn";
      li.innerText = comment.content;
      li.dataset.id = comment.id;
      li.dataset.image_id = comment.image_id;
      commentsContainer.append(li);
      li.append(deleteBtn);
      //optimistally delete
      const handleDelete = event => {
        commentId = event.target.parentNode.dataset.id;
        event.target.parentNode.remove();
        //make delete persist
        fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
          method: "DELETE",
          body: JSON.stringify({
            message: "Comment Successfully Trashed"
          })
        });
      };
      //Delete will persist, but if I add a new comment then the delete button will only spawn after refresh.
      //I think I should have seperated out the delete functionality from my render images function
      //but couldn't think of a way to do it without refactoring a ton
      //I'd like to workshop how to refactor this better, so that I have easier access to my delete function
      deleteBtn.addEventListener("click", handleDelete);
    });
  };

  const handleClick = event => {
    // console.log(likesContainer.innerText);
    likesContainer.innerText = parseInt(likesContainer.innerText) + 1;
    // console.log(event.target.dataset.image_id);
    fetch("https://randopic.herokuapp.com/likes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image_id: event.target.dataset.image_id
      })
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    commentInput = event.target.children[0];
    comment = commentInput.value;
    li = document.createElement("li");
    li.innerText = comment;
    // console.log(comment);
    id = document.getElementById("like_button").dataset.image_id;
    // console.log(id);
    commentsContainer.append(li);
    optimisticDeleteButton = document.createElement("BUTTON");
    optimisticDeleteButton.innerText = "Trash this comment my man";
    commentInput.value = "";

    //post request
    fetch("https://randopic.herokuapp.com/comments", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image_id: id,
        content: comment
      })
    });
  };

  //event listeners
  likeButton.addEventListener("click", handleClick);
  commentForm.addEventListener("submit", handleSubmit);

  //initital fetch

  fetch(imageURL)
    .then(resp => resp.json())
    .then(data => renderImages(data));
});
