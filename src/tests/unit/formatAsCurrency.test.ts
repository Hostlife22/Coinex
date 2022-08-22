import { formatAsCurrency } from '../../common/helpers/formatAsCurrency';

describe('formatAsCurrency', () => {
  it('should return $1.00 if the number is 1', () => {
    const num = 1;

    const result = formatAsCurrency(num);

    expect(result).toBe('$1.00');
  });

  it('should return -$100.50 if the number is -100.5', () => {
    const num = -100.5;

    const result = formatAsCurrency(num);

    expect(result).toBe('$-100.50');
  });
});
