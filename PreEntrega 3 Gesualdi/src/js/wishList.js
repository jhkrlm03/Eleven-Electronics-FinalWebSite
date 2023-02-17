import { noCero } from "./functions.js";

let wishList = JSON.parse(localStorage.getItem("wishList")) || [];

wishList = noCero(wishList);

export { wishList };
