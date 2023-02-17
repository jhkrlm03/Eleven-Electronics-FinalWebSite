/**
 * The darkMode switcher
 * @type {HTMLElement}
 */
const checkbox = document.getElementById("switch");

/**
 * Apply the darkMode or lightMode effect
 */
const applicator = () => {
  if (localStorage.getItem("theme") === "DarkMode") {
    darkModeOn();
  } else {
    lightModeOn();
  }
};

/**
 * Check the  state of the switch button
 */
const checker = () => {
  let checked = checkbox.checked;
  if (checked) {
    localStorage.setItem("theme", "DarkMode");
  } else {
    localStorage.setItem("theme", "WhiteMode");
  }
};

/**
 * Definition and applier of the darkMode
 */
const darkModeOn = () => {
  checkbox.checked = true;
  document.body.classList.add("dark-mode");
  document.getElementById("isotype-header-logo").src =
    "../img/logo/Isotype.png";
};

/**
 * Definition and applier of the lightMode
 */
const lightModeOn = () => {
  document.body.classList.remove("dark-mode");
  document.getElementById("isotype-header-logo").src =
    "../img/logo/Black Logo.png";
};

applicator();

checkbox.addEventListener(
  "change",
  () => {
    checker();
    applicator();
  },
  false
);
