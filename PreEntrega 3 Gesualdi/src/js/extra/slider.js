/**
 * The imgs container
 */
const bigOne = document.querySelector(".big-one");

/**
 * The collection of all the points
 */
const point = document.querySelectorAll(".point");

point.forEach((eachPoint, i) => {
  point[i].addEventListener("click", () => {
    bigOne.style.transform = `translateX(${i * -33.33}%)`;

    point.forEach((eachPoint) => {
      eachPoint.classList.remove("active");
    });

    eachPoint.classList.add("active");
  });
});
