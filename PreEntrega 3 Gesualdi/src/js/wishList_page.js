import { wishList } from "./wishList.js";

import { cart } from "./cart.js";

import {
  usPrice,
  noCero,
  localStorageSave,
  sessionStorageSave,
} from "./functions.js";

const container = document.querySelector("#wishList-dsp-container");

/**
 * To manipulate the wishList Display
 * @type {HTMLElement}
 */
const wishListDisplay = document.querySelector("#wishList-display");

/**
 * To manipulate the Void Card Message
 * @type {HTMLElement}
 */
const voidCardMsg = document.querySelector("#void-wishList");

/**
 * To manipulate the total price div
 * @type {HTMLElement}
 */
const totalPriceDisplay = document.createElement("div");

totalPriceDisplay.className = "total-price";

/**
 * To manipulate the trash icon of the cards
 * @type {HTMLElement}
 */
const remove = document.getElementsByClassName("fa-heart-circle-minus");

const eraser = () => {
  container.style.display = "none";
  voidCardMsg.style.display = "flex";
};

/**
 * To turn blank the page and load the void msg
 * @param {Boolean} timer  Indicate if you want or not the 1.5s timer
 */
const displayProdErase = (timer) => {
  if (timer) {
    container.classList.add("erase");
    setTimeout(() => {
      eraser();
    }, 1500);
  } else {
    eraser();
  }
};

/**
 * To check if the wishList is or not void
 * @param {Boolean} timer  Indicate if you want or not the 1.5s timer
 */
const wishListChecker = (timer) => {
  if (!noCero(wishList).length) displayProdErase(timer);
};

/**
 *  To format prices with US format
 * @param {Number} el The target of the process
 * @returns {Array} The formatted int part of the price and then, the float one
 */
const priceFormatter = (price) => usPrice(price).toString().split(".");

/**
 * The total price of the wishList
 * @type {Number}
 */
console.log(wishList);
let totalPrice = wishList.reduce(
  (acc, el) => acc + el.price * el.boughtAmount,
  0
);

/**
 * The formatted price of @constant totalPrice
 * @type {Number}
 */
let formattedTotalPrice = priceFormatter(totalPrice);

const deleteProduct = (inx) => {
  document.getElementsByClassName("wishList-prod").item(inx).style.display =
    "none";

  wishList[inx] = 0;

  localStorageSave({ key: "wishList", value: wishList });
  wishListChecker(true);
};

const eraseScreen = () => {
  container.classList.add("erase");
  displayProdErase(true);
};

const deleteWishList = () => {
  wishList.splice(0, wishList.length);
  localStorageSave({ key: "wishList", value: wishList });
};

const deleteConfirmation = (fn, inx, erase) => {
  Swal.fire({
    title: "¿Are you sure about this?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yeah",
    cancelButtonText: "No, it was a mistake",
  }).then((data) => {
    if (data.isConfirmed) {
      fn(inx);
      wishListChecker(true);

      if (erase) eraseScreen();

      totalPriceUpdater();

      Swal.fire({
        title: "Success action",
        icon: "success",
        text: "The product/s was successfully deleted!",
      });
    }
  });
};

const moveToCart = (product) => {
  console.log(product);
  const existingElement = cart.find((el) => el.name === product.name);
  
  const boughtAmount = (existingElement?.boughtAmount || 0) + 1;

  if (existingElement) {
    existingElement.boughtAmount = boughtAmount;
  } else {
    cart.push({
      ...product
    });
  }
  sessionStorageSave({ key: "cart", value: cart });
};

const moveToCartConfirmation = () => {
  Swal.fire({
    title: "¿Are you sure about this?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yeah",
    cancelButtonText: "No, it was a mistake",
  }).then((data) => {
    if (data.isConfirmed) {
      wishList.forEach((el) => moveToCart(el));
      deleteWishList();
      displayProdErase(true);
      eraseScreen();
      Swal.fire({
        title: "Thanks to trust in us",
        icon: "success",
        text: "We want to see you soon in the same place, in the same web",
      });
    }
  });
};

const totalPriceUpdater = () => {
  totalPrice = noCero(wishList).reduce(
    (acc, el) => acc + el.price * el.boughtAmount,
    0
  );
  formattedTotalPrice = priceFormatter(totalPrice);
  totalPriceDisplay.innerHTML = `   
    <div>
      <h3> Your total is: </h3>
      <h3 class="final-price"> 
        ${formattedTotalPrice[0]} 
        <sup> ${formattedTotalPrice[1]} </sup>
      </h3>
    </div>
  `;

  wishListDisplay.append(totalPriceDisplay);
};

wishListChecker(false);

wishList.forEach((el, i) => {
  const wishListProdCard = document.createElement("div");
  wishListProdCard.className = "wishList-prod";

  const price = priceFormatter(el.price);

  wishListProdCard.innerHTML = `<img src="${el.img}">
    <div class="characteristics">
      <h4>${el.name}</h4>
      <h3>${el.brand}</h3>
      <ul>
        <li><p>Category: <strong>${el.category}</strong></p></li>
        <li><p>Series: <strong>${el.series}</strong></p></li>
      </ul>
    </div>
    <div class="extras">
      <input class="input-bought-amount" id="input-bought-amount${i}" type="number" name="amount" min="1" step="1" value="${
    el.boughtAmount
  }"> 
      <div class="pr-price" id="price-${i + 1}">
        <h3>${price[0]} <sup>${price[1]}</sup></h3>
      </div>
      <i class="fa-solid fa-heart-circle-minus"></i>
    </div>
    `;
  wishListDisplay.append(wishListProdCard);

  let amountInput = document.getElementById(`input-bought-amount${i}`);

  amountInput.addEventListener("change", () => {
    wishList[i].boughtAmount = amountInput.value;
    localStorageSave({ key: "wishList", value: wishList });
    totalPriceUpdater();
  });
});

totalPriceUpdater();

Array.from(remove).forEach((el, i) => {
  el.addEventListener("click", () => {
    deleteConfirmation(deleteProduct, i);
  });
});

document.getElementById("erase-btn").addEventListener("click", () => {
  deleteConfirmation(deleteWishList);
});

document.querySelector("#move-btn").addEventListener("click", () => {
  moveToCartConfirmation();
});
