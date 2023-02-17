import { stock } from "./stock.js";

import { cart } from "./cart.js";

import { wishList } from "./wishList.js";

import { usPrice, localStorageSave, sessionStorageSave } from "./functions.js";

const productList = document.querySelector("#prod-list");

const cartToast = () => {
  Toastify({
    close: true,
    text: "Product added to your cart!",
    duration: 1500,
    gravity: "bottom",
    position: "right",
    style: {
      background:
        "radial-gradient(circle at 120.71% 50%, #ff7f85 0, #ff748c 8.33%, #ff6994 16.67%, #ff5d9c 25%, #ff52a4 33.33%, #ff47ad 41.67%, #f23cb5 50%, #e234be 58.33%, #cf32c8 66.67%, #b935d2 75%, #9f3bdb 83.33%, #7e42e5 91.67%, #514aed 100%)",
    },
  }).showToast();
};

const whishToast = () => {
  Toastify({
    close: true,
    text: "Product added to your wishlist!",

    duration: 1500,
    gravity: "bottom",
    position: "right",
    style: {
      background:
        "radial-gradient(circle at 120.71% 50%, #02edff 0, #3cb5f2 50%, #3f81ab 100%)",
    },
  }).showToast();
};

stock.forEach((el) => {
  const div = document.createElement("div");
  const price = usPrice(el.price).split(".");
  div.innerHTML = ` <img src="${el.img}">
    <div class="description">
      <h6 class="prod-brand"> 
        ${el.brand} 
      </h6> 
      <h5 class="prod-name">
        ${el.name}
      </h5> 
    </div>
    <div class="price-btn">
      <h4 class="prod-price">
        ${price[0]} <sup>${price[1]}</sup>
      </h4> 
      <div class="options"></div>
    </div> `;

  div.className = "product";
  productList.append(div);
});

Array.from(document.getElementsByClassName("options")).forEach((el, i) => {
  const buy = document.createElement("i");
  const addWishList = document.createElement("i");

  buy.className = "fa-solid fa-cart-shopping";

  addWishList.className = "fa-solid fa-heart";
  addWishList.setAttribute = "add-to-wishlist";

  el.append(buy, addWishList);

  buy.addEventListener("click", () => {
    const existingElement = cart.find(
      (cartProd) => cartProd.name === stock[i].name
    );

    cartToast();

    const boughtAmount = (existingElement?.boughtAmount || 0) +1;

    if (existingElement) {
      existingElement.boughtAmount = boughtAmount;
    } else {
      cart.push({
        boughtAmount,
        ...stock[i],
      });

    }

    sessionStorageSave({ key: "cart", value: cart });
  });

  addWishList.addEventListener("click", () => {
    const existingElement = wishList.find(
      (prod) => prod.name === stock[i].name
    );

    whishToast();

    const boughtAmount = (existingElement?.boughtAmount || 0) + 1;

    if (existingElement) {
      existingElement.boughtAmount = boughtAmount;
    } else {
      wishList.push({
        boughtAmount,
        ...stock[i],
      });
    }
    localStorageSave({ key: "wishList", value: wishList });
  });
});
