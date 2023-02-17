/**
 * The HTML Collection of the comments buttons
 * @type {HTMLCollection}
 */
const commentBtn = document.querySelectorAll(".comment-btn");

/**
 * The HTML Collection of the comments blocks
 * @type {HTMLCollection}
 */
const block = document.querySelectorAll(".block");

commentBtn.forEach((btn, i) => {
  commentBtn[i].addEventListener("click", () => {
    commentBtn.forEach((btn, i) => {
      btn.classList.remove("active");
      block[i].classList.remove("active");
    });

    btn.classList.add("active");
    block[i].classList.add("active");
  });
});
