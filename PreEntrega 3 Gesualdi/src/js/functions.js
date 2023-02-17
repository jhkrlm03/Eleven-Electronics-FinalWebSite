/**
 * The functions that the program need
 * @module functions
 */

/**
 * Argentinian Added Value Tax (Impuesto al Valor Agregado)
 * @type {Number}
 */
const iva = 21;

/**
 * Add IVA tax to a specific price
 * @function addIva
 * @param {Number} priceWhitOutIva The original price of the product
 * @returns {Number} The price with the IVA tax
 */
const addIva = (priceWhitOutIva) =>
  priceWhitOutIva + (priceWhitOutIva * iva) / 100;

/**
 * Add the discount that the user entered
 * @function addDiscount
 * @param {Number} price Original price
 * @param {Number} discount Discount percent value
 * @returns The price without the discount percent
 */
const addDiscount = (price, discount) => price - (price * discount) / 100;

/**
 * Format any number with the US style
 * @param {*} price The price to format
 * @returns {String} The formatted price
 */
const usPrice = (price) =>new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

/**
 * Remove the cero values of an array
 * @param {Array} array The array to filter
 * @returns {Array} The filtered array
 */
const noCero = (array) => array.filter((el) => el !== 0);

const sessionStorageSave = ({ key: string, value: array }) =>
  sessionStorage.setItem(string, JSON.stringify(array));

const localStorageSave = ({ key: string, value: array}) => {
  localStorage.setItem(string, JSON.stringify(array));
}

export { iva, addIva, addDiscount, usPrice, noCero, sessionStorageSave, localStorageSave };
