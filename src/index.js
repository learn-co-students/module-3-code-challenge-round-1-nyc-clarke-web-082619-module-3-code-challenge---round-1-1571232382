document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3697 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`;

  init();


  function init(){
    fetchImage()
    .then(renderPage)
    .then(enableLikes)
    .then(enableComments)
  }
// Fetch image data
  function fetchImage(){
    return fetch(imageURL)
      .then(resp => resp.json())
      
  }


// Render initial page from fetched image json
  function renderPage(imageJson){
    addTitle(imageJson.name);
    addImageSrc(imageJson.url);
    addLikes(imageJson.like_count);
    addComments(imageJson.comments)
  }

  function addTitle(title){
    let h4 = document.querySelector('h4');
    h4.innerText = title;
  }

  function addImageSrc(url){
    let image = document.querySelector('#image');
    image.setAttribute('src', url);
  }

  function addLikes(like_count){
    let likeSpan = document.querySelector('#likes');
    likeSpan.innerText = `${like_count}`
  }

  function addComments(commentArray){
    let commentSection = document.querySelector('#comments');

    commentArray.forEach((comment)=>{
      let li = document.createElement('li');
      li.dataset.id = comment.id;
      li.innerText = comment.content;
      li.dataset.image_id = imageId;

      commentSection.append(li)
    })

  }

  // Like Functionality

  function enableLikes(){
    let likeButton = document.querySelector('#like_button');
    let likeSpan = document.querySelector('#likes');
    let likeCount = parseInt(likeSpan.innerText);

    likeButton.addEventListener('click', (event)=>{
      likeCount += 1;
      likeSpan.innerText = likeCount;
      updateLikes(imageId);
    })

  }


  function updateLikes(imageId){
    return fetch('https://randopic.herokuapp.com/likes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })

    })
    .then(console.log('Successfully Liked!'))
  }


  // Comment Functionality


  function enableComments(){
    let commentSection = document.querySelector('#comments');
    let commentForm = document.querySelector('#comment_form');
    let commentInput = document.querySelector('#comment_input');

    commentForm.addEventListener('submit', (event)=>{
      event.preventDefault();
      let li = document.createElement('li');
      li.innerText = commentInput.value;
      li.dataset.image_id = imageId;

      commentSection.append(li);
      


      let newComment = {
        image_id: li.dataset.image_id,
        content: li.innerText
      }

      postNewComment(newComment);

      commentInput.value = '';
    })

  }


  function postNewComment(comment){
    return fetch('https://randopic.herokuapp.com/comments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    })
    .then(resp => resp.json())
    
  }


  



})





