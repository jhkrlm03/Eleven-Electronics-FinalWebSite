let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

cart = cart.filter((el) => el !== 0);

export { cart };
