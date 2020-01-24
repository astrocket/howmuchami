export function currencyFormat(num) {
  return parseFloat(num).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
