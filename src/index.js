document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3701 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const image = document.querySelector("#image")
  const name = document.querySelector("#name")
  const likes = document.querySelector("#likes")
  const comments = document.querySelector("#comments")
  const likeBtn = document.querySelector("#like_button")
  const commentForm = document.querySelector("#comment_form")

  getImage()

  //fetches the image, image name, image likes, image comments and loads them to the DOM.
  function getImage(){
    fetch(imageURL).then(response => response.json()).then(response => {
      image.src = response.url;
      name.innerText = response.name;
      likes.innerText = response["like_count"];
      response.comments.forEach(renderComment)
    })
  }

  //creates a list item with a button and appends it to the comments unordered list
  function renderComment(comment){
    let li = document.createElement("li")
    li.innerHTML = `${comment.content} <button class="delete" data-id= ${comment.id} >Delete</button>`

    comments.appendChild(li)
    
  }

  //deletes comments pessimistically
  document.addEventListener("click", (event)=>{
    if (event.target.className === "delete"){
      let id = event.target.dataset.id
      fetch(commentsURL + id, {
        method: "DELETE"
      }).then(response => response.json()).then(response => {
        event.target.parentNode.remove();
        alert(`${response.message}`)})
      }
    })

  //updates likes optimistically
  likeBtn.addEventListener("click", (event) => {
    let likes = parseInt(event.target.previousElementSibling.children[0].innerText) + 1
    fetch(likeURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId

      })
    });
    event.target.previousElementSibling.children[0].innerText = likes
    })

    // updates comments pessimistically
    commentForm.addEventListener("submit", (event) =>{
      event.preventDefault()
      let comment = event.target.comment.value
      fetch(commentsURL, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: imageId,
          content: comment
        })
    }).then( response => response.json()).then(response => {
      renderComment(response);
      event.target.comment.value = ""
    })
  })

  //renders comments optimistically
  // commentForm.addEventListener("submit", (event) =>{
  //   event.preventDefault()
  //   let comment = { "content": event.target.comment.value}
  //   fetch(commentsURL, {
  //     method: "POST",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       image_id: imageId,
  //       content: event.target.comment.value
  //     })
  // })
  //   renderComment(comment);
  //   event.target.comment.value = ""
  // })
})
