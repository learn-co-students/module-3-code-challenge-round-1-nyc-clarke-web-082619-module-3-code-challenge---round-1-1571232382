const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

const image = document.querySelector('img');
const nameH4 = document.getElementById('name');
const likesSpan = document.getElementById('likes');
const commentsUl = document.getElementById('comments');
const likeButton = document.getElementById('like_button');
const form = document.getElementById('comment_form');

//step 1 - get the image data

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3698//Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  fetch(imageURL)
  .then(resp=>resp.json())
  .then(data => {
    loadPage(data);
  });
})

function loadPage(data){
  image.setAttribute('src', data.url);
    image.setAttribute('data-id', data.id);
    nameH4.innerText = data.name;
    likesSpan.innerText = data.like_count;
    data.comments.forEach((comment)=>{
      let newLi = document.createElement('li');
      newLi.innerHTML = `${comment.content} <button class="delete">delete</button>`;
      newLi.setAttribute('data-id', comment.id);
      commentsUl.appendChild(newLi);
    })
}

//step 2 and 3 Like feature

likeButton.addEventListener('click', (event)=>{
  let likesNumber = parseInt(likesSpan.innerText);
  likesNumber += 1;
  likesSpan.innerText = `${likesNumber}`

  fetch(likeURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: 3698,
      like_count: likesNumber
    })
  }).then(resp => resp.json())
  .then(data => console.log(data));
});


//step 4 and 5 comment feature

form.addEventListener('submit', (event)=>{
  event.preventDefault();
  let input = event.target.comment.value;
  let newLi = document.createElement('li');
  newLi.innerHTML = `${input} <button class="delete">delete</button>`;
  commentsUl.appendChild(newLi);
  form.comment.value = '';

  fetch(commentsURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: 3698,
      content: input
    })
  }).then(resp => resp.json())
  .then(data => {
    console.log(data);
    newLi.setAttribute('data-id', data.id);
  });

});

//BONUS: delete feature

commentsUl.addEventListener('click', (event)=>{
  if (event.target.classList.contains('delete')){
    console.log(event.target);
    let id = event.target.parentNode.getAttribute('data-id');
    
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);

    fetch(`https://randopic.herokuapp.com/comments/${id}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
    .then(data => console.log(data))
  }
})






