const infoSlider = document.querySelector("#info-slider");

const infoSliderSection = document.querySelectorAll(
  ".information-slider-section"
);

const InfoSliderRightMovement = () => {
  const sliderSectionFirst = document.querySelectorAll(
    ".information-slider-section"
  )[0];

  infoSlider.style.marginLeft = "-200%";
  infoSlider.style.transition = ".5s";
  setTimeout(() => {
    infoSlider.style.transition = "none";

    infoSlider.insertAdjacentElement("beforeend", sliderSectionFirst);
    infoSlider.style.marginLeft = "-100%";
  }, 500);
};

let sliderSectionLast = infoSliderSection[infoSliderSection.length - 1];

infoSlider.insertAdjacentElement("afterbegin", sliderSectionLast);

setInterval(() => InfoSliderRightMovement(), 3500);
