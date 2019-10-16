document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3706 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let imageCard = document.getElementById('image_card');
  let imageTag = document.getElementById('image_card').children[0].src;
  let likeButton = document.getElementById('like_button');
  console.log(imageCard)
  
  function getImage() {
    fetch(imageURL)
      .then(resp => resp.json())
      .then(imageObj => renderImage(imageObj))
  }

  function renderImage(imageObj) {
    // console.log(imageCard.children.innerHTML)
    imageCard.children.innerHTML = `
    <img src='${imageObj.url}' id="image" data-id=""/>
          <h4 id="name">${imageObj.name}</h4>
          <span>Likes: 
            <span id="likes"> ${imageObj.like_count} </span>
          </span>
          <button id="like_button">Like</button>
          <form id="comment_form">
            <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <input type="submit" value="Submit"/>
          </form>
          <ul id="comments">
               <li> ${imageObj.comments} </li>
          </ul>
        </div>
    `
  }

  // likeButton.addEventListener('click', (event) => {
  //   console.log(event.target)
  //   let likes = document.getElementById('likes');
  //   console.log((likes.innerText) + 1)
  //   likes.innerText = parseInt(likes) + 1;
  // })





  getImage();

})
