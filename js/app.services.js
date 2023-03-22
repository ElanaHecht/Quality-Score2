'use strict'

export const appService = {
   addCurrencyDecimals,
   calcSavings,
};

function addCurrencyDecimals(num) {
   return `$${num.toFixed(2)}`;
};

function calcSavings(retail, price) {
   return addCurrencyDecimals(retail - price);
};