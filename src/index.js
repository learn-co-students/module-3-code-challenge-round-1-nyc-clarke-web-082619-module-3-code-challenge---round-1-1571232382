document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3702 
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes`
  const commentsURL = `https://randopic.herokuapp.com/comments`
  const host = document.getElementById('image-card');
  const imgTag = document.getElementById('image');
  const imgName = document.getElementById('name');
  const likeSpan = document.getElementById('likes');
  const commentSect = document.getElementById('comments')
  const commentInput = document.getElementById('comment_input');
  commentInput.setAttribute('required', true);

  function getImage(){
    fetch(imageURL)
    .then(resp => {
      return resp.json();
    })
    .then(info =>{
      //console.log(info);
      let img = Object.assign({id: info.id, url: info.url, name: info.name, like_count: info.like_count, comments: info.comments})
      //console.log(img);
      //console.log(img.comments)
      renderImg(img);
    })
  }
  function renderImg(img){
    imgTag.src = img.url;
    imgName.textContent = img.name
    likeSpan.textContent = img.like_count;
    for(const comment of img.comments){
      let li = document.createElement('li');
      li.textContent = comment.content;
      let button = document.createElement('button');
      button.textContent = 'DELETE COMMENT';
      button.id = 'delete-btn';
      button.setAttribute('data-id', comment.id);
      li.appendChild(button);
      commentSect.appendChild(li);

    }    
  }

  function likeThis(likeNum){
    fetch(likeURL,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        like_count: likeNum
      })
    })
  }

  function postComment(comment){
    //console.log(comment);
    fetch(commentsURL,{
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: comment
      })
    })
    location.reload();
  }

  function deleteComment(id){
    fetch(`https://randopic.herokuapp.com/comments/${id}`,{
      method: 'DELETE'
    })
  }

  document.getElementById('comment_form').addEventListener('submit', (event)=>{
    event.preventDefault();
    let commentTerm = commentInput.value;
    //console.log(commentTerm)
    let li = document.createElement('li');
    li.textContent = commentTerm;
    let button = document.createElement('button');
    button.textContent = 'DELETE COMMENT';
    li.appendChild(button);
    commentSect.appendChild(li);
    commentInput.value = '';
    postComment(commentTerm);
  })
  document.getElementById('like_button').addEventListener('click', (event)=>{
    //console.log(typeof(likeSpan.textContent))
    let likeNum = parseInt(likeSpan.textContent);
    likeNum += 1;
    likeSpan.textContent = likeNum;
    likeThis(likeNum);
  })
  commentSect.addEventListener('click', (event)=>{
    if(event.target.id === 'delete-btn'){
      //console.log(event.target.getAttribute('data-id'))
      let commentId = event.target.getAttribute('data-id');
      commentSect.removeChild(event.target.parentNode);
      deleteComment(commentId);
    }
  })


  getImage();
})
