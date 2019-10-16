document.addEventListener("DOMContentLoaded", () => {
  console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

  let imageId = 3707;

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
  let container = document.querySelector(".container");
  console.log(container);

  const likeURL = `https://randopic.herokuapp.com/likes/`;

  const commentsURL = `https://randopic.herokuapp.com/comments/`;

  fetch(imageURL)
    .then(response => response.json())
    .then(data => renderImage(data));

  function renderImage(imageData) {
    container.innerHTML += `<div class="card col-md-4">
      <img src="${imageData.url}" id="image" />
      <h4 id="name">${imageData.name}</h4>
      Likes: <span id="likes">${imageData.like_count} </span></br>
      <button class="like-button">Like This Photo</button>
      </div>`;
  }

  function incrementLikes(event) {
    let currentLikes =
      event.target.previousElementSibling.previousElementSibling.innerText;
    // debugger;
    let number = parseInt(currentLikes) + 1;
    console.log(number);
    fetch(`https://randopic.herokuapp.com/likes/3707`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: number
      })
    })
      .then(response => response.json())
      .then(x => {
        event.target.previousElementSibling.previousElementSibling.innerText = `${number}`;
      });
  }

  document.addEventListener("click", function() {
    if (event.target.className === "like-button") {
      event.preventDefault();
      console.log("Ping Pong Table");
      incrementLikes(event);
    }
  });

  function addComment() {}

  document.addEventListener("input", function() {
    if (event.target.id === "comment_input") {
      event.preventDefault();
      console.log("hi");
    }
  });
});
