document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3700 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageDiv = document.querySelector('#image_card')
  const commentsLi = document.querySelector("#comments")

  function getImages() {
    fetch(imageURL)
    .then(resp => resp.json())
    .then(image => renderImage(image))
  }
  
  function renderImage(imageData){
    imageDiv.innerHTML += 
    `<div id="image_card" class="card col-md-4">
    <img src=${imageData.url} id="image" data-id=${imageData.image_id}/>
    <h4 id="name">${imageData.name}</h4>
    <span>Likes:
      <span id="likes">${imageData.like_count}</span>
    </span>
    <button id="like_button">Like</button>
  </div>`;

  //tried running event listener on submit here but could not get it to work...
  //i tried attaching it to the document, to the form for comments, no dice

  }
  
  function increaseLikes(event) {
    let currentLikes = event.target.previousElementSibling.children[0].innerText
    let num = parseInt(currentLikes) + 1
    console.log(num)
    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        image_id: 3700
      })
    })
    .then(resp => resp.json())
    .then(x => {
      event.target.previousElementSibling.children[0].innerText = num;
    })
  }

  function addComment(event) {

    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: 3700,
        content: event.target.innerText
      })
    })
    .then(resp => resp.json())
    .then(x => {commentsLi.innerHTML += `<li>${event.target.innerText}</li>`})
  }

  document.addEventListener('click', (event) => {
    
    event.preventDefault();
    if (event.target.id === 'like_button') {
    increaseLikes(event)
    };

    // if(event.target.id === "image_card") {
    //   // console.log(event.target.children[4])
    //   addComment(event.target.children[4])
    // }
  })

  const commentform = document.getElementById("comment_form")
  console.log(comment_form.children[0])


  // tried everything below and couldn't figure out how to post a comment


  // document.getElementById("comment_input").addEventListener('submit', event => {
  //     if (event.target.id === "comment_form")
  //       console.log(event.target.children[0])
  //       addComment(event.target.children[0])
  //       // commentsLi.innerHTML += `<li>${event.target.innerText}</li>`
  //     })

  // commentform.addEventListener('submit', event => {
  //   if (event.target.id === "comment_form")
  //     console.log(event.target.children[0])
  //     // addComment(event.target.children[0])
  //     // commentsLi.innerHTML += `<li>${event.target.innerText}</li>`
  //   })
  
  // document.addEventListener('submit', (event) => {
  //   event.preventDefault();
  //   if (event.target.id === "comment_form") {
  //     console.log(event)
  //   }
  // })

  getImages()

}) 

