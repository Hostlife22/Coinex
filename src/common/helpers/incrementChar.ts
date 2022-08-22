export function incrementChar(number: number): string {
  const inc = String(number)
    .replace(/\d/g, '0')
    .replace(/(.*)\d/, '$11');
  const newNumber = Number(number) - Number(inc);

  return newNumber.toFixed(2);
}
