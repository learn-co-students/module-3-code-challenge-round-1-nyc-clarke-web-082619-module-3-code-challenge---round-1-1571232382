document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3696 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  function populateComments(arr){
    let commentsUL = document.getElementById('comments');
    arr.forEach(comment => {
      let li = document.createElement('li');
      let liText = document.createTextNode(comment.content);
      let commentButton = document.createElement('button');
      commentButton.setAttribute('data-id', comment.id);
      commentButton.classList.add('comment-button');
      commentButton.textContent = 'Delete';
      li.setAttribute('data-id', comment.id);
      li.setAttribute('image-id', imageId);
      li.appendChild(liText);
      li.appendChild(commentButton);
      commentsUL.appendChild(li);
    })
  }

  function setUpPage(){
    let image = document.getElementById('image');
    let h4 = document.getElementById('name');
    let likes = document.getElementById('likes');
    //let commentsUL = document.getElementById('comments');
    fetch(imageURL)
    .then(response => response.json())
    .then(json => {
        image.src = json.url;
        image.setAttribute('data-id', json.id);
        h4.textContent = json.name;
        likes.textContent = `${json.like_count} likes`;
        likes.setAttribute('data-like', json.like_count);
        populateComments(json.comments);
      })
  }

  function increaseLikes(){
    let likes = document.getElementById('likes');
    let currLikes = parseInt(likes.getAttribute('data-like'), 10);
    currLikes = currLikes + 1;
    likes.setAttribute('data-like', currLikes);
    likes.textContent = `${currLikes} likes`;

    let formData = {image_id: imageId};

    let configObj = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    fetch(likeURL, configObj)
    //.then(response => console.log(response));
  }

  function addComment(){
    let comments = document.getElementById('comments');
    let comment = document.createElement('li');
    let commentInput = document.getElementById('comment_input');
    let commentValue = commentInput.value;
    let commentText = document.createTextNode(commentValue);

    let commentButton = document.createElement('button');
    //commentButton.setAttribute('data-id', comment.id);
    commentButton.classList.add('comment-button');
    commentButton.textContent = 'Delete';

    comment.setAttribute('image-id', imageId);
    comment.appendChild(commentText);
    comment.appendChild(commentButton);
    comments.appendChild(comment);
    commentInput.value = "";

    let formData = {image_id: imageId, content: commentValue};
    let configObj = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }
    fetch(commentsURL, configObj)
    .then(response => response.json())
    .then(json => {
      //console.log(json);
      commentButton.setAttribute('data-id', json.id);
      comment.setAttribute('data-id', json.id);
    })
  }

  function deleteComment(id, target){
    let configObj = {
      method: "DELETE"
    }
    fetch(`https://randopic.herokuapp.com/comments/${id}`, configObj)
    .then(response => {
      
      //console.log(response);
    })
    .catch(error => {
      alert("ERROR");
      console.log(error);
    })
    let comments = target.parentNode.parentNode;
    comments.removeChild(target.parentNode);
  }

  setUpPage();

  document.getElementById('image_card').addEventListener('click', (event) => {
    if(event.target.id === "like_button"){
      increaseLikes();
    }
  })

  document.getElementById('comment_form').addEventListener('submit', (event) => {
    event.preventDefault();
    addComment();
  })

  document.getElementById('comments').addEventListener('click', (event) => {
    if(event.target.classList.contains('comment-button')){
      //console.log(event.target);
      deleteComment(event.target.getAttribute('data-id'), event.target);
    }
  })

})
