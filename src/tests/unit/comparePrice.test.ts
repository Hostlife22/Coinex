import { comparePrice } from '../../common/helpers/comparePrice';

describe('compare price', () => {
  it('should return 1 if a > b', () => {
    const a = 100;
    const b = 50;

    const result = comparePrice(a, b);

    expect(result).toBe(1);
  });

  it('should return 1 if a > b and the numbers are negative', () => {
    const a = -50;
    const b = -100;

    const result = comparePrice(a, b);

    expect(result).toBe(1);
  });

  it('should return -1 if a < b', () => {
    const a = 50;
    const b = 100;

    const result = comparePrice(a, b);

    expect(result).toBe(-1);
  });

  it('should return -1 if a < b and the numbers are negative', () => {
    const a = -100;
    const b = -50;

    const result = comparePrice(a, b);

    expect(result).toBe(-1);
  });

  it('should return 0 if a = b', () => {
    const a = 50;
    const b = 50;

    const result = comparePrice(a, b);

    expect(result).toBe(0);
  });
});
