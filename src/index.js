
 let imageId = 3711 //Enter the id from the fetched image here

 const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

 const likeURL = `https://randopic.herokuapp.com/likes/`

 const commentsURL = `https://randopic.herokuapp.com/comments/`

const imageContainer = document.getElementById('image_card');

const commentsUl = document.getElementById('comments');

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  fetchPicture();
})

document.addEventListener('click', () =>{
  
  if(event.target.id === "like_button"){
    let id = event.target.parentNode.dataset.id
    let likes = event.target.previousElementSibling.firstElementChild.innerText++;
    patchLikes(id, likes)
  }else if(event.target.id === "submit"){
    event.preventDefault();
    let id = event.target.parentNode.parentNode.dataset.id;
    let content = event.target.previousElementSibling;
    // console.log(id)
    patchComments(id, content.value);
    content.value = "";
    // console.log(content)
    // console.log(id)
  }else if(event.target.id === "delete_comment"){
    // console.log(event.target)
    let id = event.target.dataset.id;
    event.target.parentNode.remove()
    deleteComment(id);
  }
})

function deleteComment(id){
  fetch(`https://randopic.herokuapp.com/comments/${id}`,{
    method: "delete"
  }).then(alert("deleted!"))
}

function patchComments(id, content){
  fetch(commentsURL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "applicaiton/json"
    },
    body: JSON.stringify({
      image_id: id,
      content: content
    })
  })
  .then(resp => resp.json())
  .then(comment => showComment(comment))
}

function patchLikes(id, likes){
  fetch(likeURL,{
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      image_id: id,
      like_count: likes
    })
  })

}

function fetchPicture(){
  fetch(imageURL)
  .then(resp => resp.json())
  .then(json => showPicture(json))
}

function showPicture(picture){
  imageContainer.setAttribute('data-id', picture.id);
  let childs = imageContainer.childNodes
  console.log(imageContainer.childNodes)
  childs[1]['src'] = picture.url;
  childs[3].innerText = picture.name
  childs[5].firstElementChild.innerText = picture.like_count
  for(let i = 0; i< picture.comments.length; i++){
    showComment(picture.comments[i]);
  }
  // childs[11].innerText = picture.comments[0].content  
}

function showComment(comment){
  let commentLi = document.createElement('li');
  commentLi.innerText = comment.content;
  commentsUl.append(commentLi);
  let commentDelete = document.createElement('button')
  commentDelete.innerText = "Delete"
  commentDelete.id = "delete_comment";
  commentDelete.setAttribute('data-id', comment.id)
  commentLi.append(commentDelete);
}