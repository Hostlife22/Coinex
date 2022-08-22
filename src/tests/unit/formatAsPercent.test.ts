import { formatAsPercent } from '../../common/helpers/formatAsPercent';

describe('formatAsPercent', () => {
  it('should return 0.00% if the number is 0', () => {
    const num = 0;

    const result = formatAsPercent(num);

    expect(result).toBe('0.00%');
  });

  it('should return 87.22% if the number is 87.229', () => {
    const num = 87.22;

    const result = formatAsPercent(num);

    expect(result).toBe('87.22%');
  });

  it('should return -57.26% if the number is -57.26', () => {
    const num = -57.26;

    const result = formatAsPercent(num);

    expect(result).toBe('-57.26%');
  });
});
