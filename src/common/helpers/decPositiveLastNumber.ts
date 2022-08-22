export function decPositiveLastNumber(number: number): number {
  const decim = ~(number + '').indexOf('.') ? (number + '').split('.')[1].length : 0;

  const dec = String(number)
    .replace(/\d/g, '0')
    .replace(/(.*)\d/, '$11');
  const newNumber = Number(number) - Number(dec);

  return +newNumber.toFixed(decim);
}
