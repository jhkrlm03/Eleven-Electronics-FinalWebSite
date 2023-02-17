import { cart } from "./cart.js";

import {
  usPrice,
  noCero,
  sessionStorageSave,
} from "./functions.js";

const container = document.querySelector("#cart-dsp-container");

/**
 * To manipulate the Cart Display
 * @type {HTMLElement}
 */
const cartDisplay = document.querySelector("#cart-display");

/**
 * To manipulate the Void Card Message
 * @type {HTMLElement}
 */
const voidCardMsg = document.querySelector(".void-cart");

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
const trash = document.getElementsByClassName("fa-trash");

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
 * To check if the cart is or not void
 * @param {Boolean} timer  Indicate if you want or not the 1.5s timer
 */
const cartChecker = (timer) => {
  if (!noCero(cart).length) displayProdErase(timer);
};

/**
 *  To format prices with US format
 * @param {Number} el The target of the process
 * @returns {Array} The formatted int part of the price and then, the float one
 */
const priceFormatter = (price) => usPrice(price).toString().split(".");

/**
 * The total price of the cart
 * @type {Number}
 */
let totalPrice = cart.reduce((acc, el) => acc + el.price * el.boughtAmount, 0);

/**
 * The formatted price of @constant totalPrice
 * @type {Number}
 */
let formattedTotalPrice = priceFormatter(totalPrice);

const deleteProduct = (inx) => {
  document.getElementsByClassName("cart-prod").item(inx).style.display = "none";

  cart[inx] = 0;

  sessionStorageSave({ key: "cart", value: cart });
  cartChecker(true);
};

const eraseScreen = () => {
  cartContainer.classList.add("erase");
  displayProdErase(true);
};

const deleteCart = () => {
  cart.splice(0, cart.length);
  sessionStorageSave({ key: "cart", value: cart });
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
      cartChecker(true);

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

const finishTransaction = () => {
  Swal.fire({
    title: "¿Are you sure about this?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yeah",
    cancelButtonText: "No, it was a mistake",
  }).then((data) => {
    if (data.isConfirmed) {
      Swal.fire({
        title: "Thanks to trust in us",
        icon: "success",
        text: "We want to see you soon in the same place, in the same web",
      });
      deleteCart();
      displayProdErase(true);
      eraseScreen();
    }
  });
};

const totalPriceUpdater = () => {
  totalPrice = noCero(cart).reduce(
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

  cartDisplay.append(totalPriceDisplay);
};

cartChecker(false);

cart.forEach((el, i) => {
  const cartProdCard = document.createElement("div");
  cartProdCard.className = "cart-prod";

  const price = priceFormatter(el.price);

  cartProdCard.innerHTML = `<img src="${el.img}">
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
      <i class="fa-solid fa-trash"></i>
    </div>
    `;
  cartDisplay.append(cartProdCard);

  let amountInput = document.getElementById(`input-bought-amount${i}`);

  amountInput.addEventListener("change", () => {
    cart[i].boughtAmount = amountInput.value;
    sessionStorageSave({ key: "cart", value: cart });
    totalPriceUpdater();
  });
});

totalPriceUpdater();

Array.from(trash).forEach((el, i) => {
  el.addEventListener("click", () => {
    deleteConfirmation(deleteProduct, i);
  });
});

document.getElementById("erase-btn").addEventListener("click", () => {
  deleteConfirmation(deleteCart);
});

document.querySelector("#buy-btn").addEventListener("click", () => {
  finishTransaction();
});

