import { decPositiveLastNumber } from '../../common/helpers/decPositiveLastNumber';

describe('incrementChar', () => {
  it('should return 12.32 if the number is 12.33', () => {
    const num = 12.33;

    const result = decPositiveLastNumber(num);

    expect(result).toBe(12.32);
  });

  it('should return -1 if the number is 0', () => {
    const num = 0;

    const result = decPositiveLastNumber(num);

    expect(result).toBe(-1);
  });

  it('should return -12.137 if the number is -12.138', () => {
    const num = -12.138;

    const result = decPositiveLastNumber(num);

    expect(result).toBe(-12.137);
  });
});
