const imageCard = document.getElementById('image_card');
const imageTag = document.getElementById('image');
const imageTitle = document.getElementById('name');
const imageLikes = document.getElementById('likes');
const imageCommentsContainer = document.getElementById('comments');
const commentForm = document.getElementById('comment_form');

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3708 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchImage();

  document.addEventListener('click', function(){
    if(event.target.id === 'like_button'){
      event.preventDefault();
      let incrementLikes = parseInt(event.target.previousElementSibling.firstElementChild.innerText) + 1;
      let id = parseInt(event.target.parentNode.dataset.id)

      fetch(likeURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'image_id': id
        })
      })
      .then(resp => resp.json())

      imageLikes.innerText = incrementLikes
    }

    else if(event.target.id === 'delete-btn'){
      event.preventDefault();
      let id = parseInt(event.target.parentNode.dataset.commentid)
      fetch(commentsURL + `/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'id': id
        })
      })
      event.target.parentNode.remove();
      setTimeout(function(){alert('Comment deleted')}, 50);
    }
  })

  commentForm.addEventListener('submit', function(){
    event.preventDefault();

    let imageComment = document.createElement('li');
    let commentInput = document.getElementById('comment_input').value;
    let id = parseInt(event.target.parentNode.dataset.id)

    imageComment.innerHTML = commentInput + " <span id='delete-btn' style='color:red;' class='delete'>X</span>"
    
    imageCommentsContainer.appendChild(imageComment);
    
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'image_id': id,
        'content': commentInput
      })
    })
    .then(resp => resp.json())
    .then(data => {
      imageComment.setAttribute('data-commentId', data.id)
    })

    commentForm.reset();
  })

//******************************************************************** */
  function fetchImage(){
    fetch(imageURL)
    .then(resp => resp.json())
    .then(data => {
      renderImage(data.url, data.name, data.like_count, data.id);
      data.comments.forEach(comment => {
        let imageComment = document.createElement('li');
        imageComment.setAttribute('data-commentId',comment.id);
        imageComment.innerHTML = comment.content + " <span id='delete-btn' style='color:red;' class='delete'>X</span>"
        imageCommentsContainer.appendChild(imageComment);
      })
    })
  }
  
  function renderImage(url, name, likes, id){
    imageCard.setAttribute('data-id', id)
    imageTag.setAttribute('src', url);
    imageTitle.innerText = name;
    imageLikes.innerText = likes;
  }

})