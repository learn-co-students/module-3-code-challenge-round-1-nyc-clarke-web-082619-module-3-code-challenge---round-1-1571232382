document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3704

  const imageURL = `https://randopic.herokuapp.com/images/`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imgContainer = document.querySelector("#image"); 


  function setImgURL(obj){
    document.getElementById('image').src = obj.url
    document.getElementById('name').innerText = obj.name 
    document.getElementById('like_button').value = obj.like_count
   }


  return fetch(`${imageURL}/${imageId}`) 
   .then(resp => resp.json()) 
   .then(json => setImgURL(json))

  })

