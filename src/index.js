document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3705; //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let nameElement = document.getElementById("name");      // html name 
  let imageElement = document.getElementById("image");    // html image
  let likesElement = document.getElementById("likes");    // html likes
  let commentList = document.getElementById("comments");  // html comments
  
  displayImage();

  document.addEventListener("click", event => {
    event.preventDefault();
    console.log(event.target);
    if (event.target.id === "like_button") {
      incrementLikes();
    }
    else if (event.target.id === "add_comment_button") {
      addComment();
    }
    else if(event.target.className === "delete_comment_button") {
      let id = event.target.parentNode.id.split("_")[1];
      deleteComment(id);
    }

  })

  function deleteComment(id) {
    fetch(`${commentsURL}${id}`, {
      method: "DELETE"      
    }).then (()=> {     //pessimistic approach
      document.getElementById(`comment_${id}`).remove();  
    })
  }

  function addComment() {
    let comment = document.createElement("li");
    let commentContent = document.getElementById("comment_input").value;
    comment.innerHTML = commentContent;
    commentList.appendChild(comment);
    fetch(commentsURL,{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: commentContent
      })
    })
  }

  function incrementLikes () {
    let likes = parseInt(likesElement.innerHTML) + 1;   // optimistic rendering
    likesElement.innerHTML = likes;

    fetch(likeURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        likes: likes
      })
    })
  }

  function displayImage(){
    fetch(imageURL)
      .then(response => response.json())
      .then(imageData => {
        console.log(imageData);
        setImageToPage(imageData);
      }) 
  }

  function setImageToPage(imageData) {
    nameElement.innerHTML = imageData.name;
    imageElement.src = imageData.url;
    likesElement.innerHTML = imageData.like_count;

    imageData.comments.forEach(comment => {
      let commentItem = document.createElement("li");
      commentItem.innerHTML = comment.content; 
      commentItem.setAttribute("id",`comment_${comment.id}`);
      commentItem.setAttribute("class","comment_element");
      commentList.appendChild(commentItem);
    });
    addDeleteButtonsToComments();
  }

  function addDeleteButtonsToComments() {
    comments = document.getElementsByClassName("comment_element");
    for(let i = 0; i < comments.length; ++i){
      let button = document.createElement("button");
      button.setAttribute("class","delete_comment_button");
      button.style.width = "25px";
      button.style.height = "25px";
      button.style.marginTop ="5px";
      button.style.marginLeft ="10px";
      button.style.marginBottom = "10px";
      button.style.textAlign ="center";
      button.style.verticalAlign = "middle";
      button.innerText = "x";
      comments[i].appendChild(button);
    }
  }

})//end DOMContentLOADED
