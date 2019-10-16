document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3709 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


fetch(imageURL)
  .then(resp => resp.json())
  .then(resp => renderImage(resp))

  function renderImage(imageObj){
    let imageDiv = document.querySelector('#image')
    imageDiv.src = imageObj.url
    likesDiv = document.querySelector('span')
    likesDiv.dataset.id = imageObj.id
    likesDiv.innerText = imageObj.like_count
    let likeButton = document.querySelector('#like_button')
    likeButton.dataset.id = imageObj.id
    let likeInput = document.querySelector('#comment_input')
    likeInput.dataset.id = imageObj.id
    let submitBtn = document.querySelector('#submit')

    submitBtn.addEventListener('click', function(event){
      event.preventDefault();
      let ul = document.querySelector('#comments')
      let li = document.createElement('li')
      li.innerText = document.querySelector('#comment_input').value
      // console.log(li)
      ul.appendChild(li)
      let input = document.querySelector('#comment_input').value
      let comment = {image_id: imageId, content: input}
      postComment(comment);
     })
      likeButton.addEventListener('click', function(){
        event.preventDefault();
        let likes = document.querySelector('span')
        let parseLikes = parseInt(document.querySelector('span').innerText)
        parseLikes++;
        likes.innerText = parseLikes
        changeLikes({image_id: imageId})
      })
  }

      function changeLikes(likesData){
        fetch(`https://randopic.herokuapp.com/likes/`, {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
             Accept: 'application/json'
          },
          body: JSON.stringify(likesData)
        })
        .then(resp => resp.json())
        .then(resp => console.log(resp))
      }
      
      function postComment(commentObj){
        fetch(commentsURL, {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(commentObj)
        })
        .then(resp => resp.json())
        .then(resp => console.log(resp))
      }

  }
  

)
