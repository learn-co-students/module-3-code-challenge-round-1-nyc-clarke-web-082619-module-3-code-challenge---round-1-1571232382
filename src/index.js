document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3710 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageCard = document.querySelector('#image_card')


// ====================================== *things to find*================================
  // view 
// like
// comment
// on a single picture

// user shoudl see an image
// any comments that image has
// the number of likes that image has


// user can click on button
// add event listener to button 
// increase likes of an image
// without refreshing

// user can enter text in an input field
// add event listener to form input values
// find input text field
// event listener for submit form
// be able to add comments to an image without refreshing
// should see new comment *below* any previous comments

// when page refreshes any comments or likes that have been adeed
// should still be there
// make patch request

// ================================= STEP 1 - get Image data ==========================

function getImages(){
  return fetch(imageURL)
  .then(resp => resp.json())
  .then(json => renderImage(json))
}

function renderImage(image){
  imageCard.innerHTML +=
  `
    <img src="${image.url}" id="image" data-id=""/>
    <h4 id="name">${image.name}</h4>
    <span>Likes:
      <span id="likes">${image.like_count}</span>
    </span>
    <button id="like_button">Like</button>
    
  `
}
// increase likes 
// click the like button and increase likes
// user can like the sma picture multiple times
function increaseLike(){
  // add event listener to like button
  // find like button
  document.addEventListener("click", event => {
    let like = document.getElementById('likes')
    if (event.target.id === 'like_button')
      // find likes
      like.innerHTML = +1
      console.log(like)
      postLike(like)
  })
}
function postLike(like){
  fetch(likeURL,{
    method:'POST',
    header: {
    
    }
  })
}

// trying to post likes
// function postLike(like)
// function postLike(image){
//   fetch(likeURL,{
//     method:'POST',
//     header:{
//       "Content-Type": "application/json",
//       Accept : 'application/json'
//     },
//     body: JSON.stringify({
//       id : image.id,
//       image_id : `${imageId}`
//     }),
//   }).then(increaseLike).then(console.log)

// }


// dont forget to call functions
  getImages()
  increaseLike()
  
})
