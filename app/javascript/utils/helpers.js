export function currencyFormat(num) {
  return parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "원";
}

export function expandManCurrency(num) {
  return currencyFormat(num * 10000)
}

export function asMonthCurrency(num_per_year) {
  return expandManCurrency(num_per_year / 12);
}

export function log(...args) {
  return console.log(args);
}