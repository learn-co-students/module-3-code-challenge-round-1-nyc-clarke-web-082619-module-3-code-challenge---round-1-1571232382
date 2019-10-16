document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3703
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageCard = document.getElementById('image_card')
  const likeBtn = document.getElementById('like_button')
  let likes = document.getElementById('likes')
  

  
  


  fetch(imageURL)
  .then(response => response.json())
  .then(image => renderImage(image))
 
//render image on page-----------------------------
  function renderImage(image){
    imageCard.innerHTML=`
          <img src="${image.url}" id="image" data-id=""/>
          <h4 id="name">${image.name}</h4>
          <span>Likes:
            <span id="likes">${image.like_count}</span>
          </span>
          <button id="like_button">Like</button>
          <form id="comment_form">
            <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <button id="submit" type="submit">Submit</button>
          </form>
          <ul id="comments">
               <!-- <li> for each comment goes here -->
          </ul>
    `
  }
  console.log(imageCard)

  imageCard.addEventListener('click', function(event){
     if(event.target.id === 'like_button'){
      fetch(likeURL, {
       method:'POST',
       headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, body: JSON.stringify(
        {
          image_id: imageId,
          image:like_count = image.like_count
        }
      )
      })
      
      likes.innerText=like_count

    }
  })


 document.addEventListener('submit', function(event){
    event.preventDefault()
    console.log(event.target)
    let comment = (event.target.input)
    let ul = document.getElementById('comments')

    ul.innerHTML += `
    <li>${comment}</li>
    `

    // fetch(commentsURL, {
    //   method: 'POST',
    //   headers:
    //   {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(
    //     {
    //       image_id: imageId,
    //       content: comment
    //       }
    //     }
    //   )
    })

  })










})
