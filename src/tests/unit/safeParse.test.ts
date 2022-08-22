import { safeParse } from '../../common/helpers/safeParse';

describe('Safe parse', () => {
  it('should be able to safely parse a string into an object', () => {
    expect(safeParse('{"a": 1}')).toEqual({ a: 1 });
  });

  it('should be able to safely parse a string into an array', () => {
    expect(safeParse('[1, 2, 3]')).toEqual([1, 2, 3]);
  });

  it('should return null if string is not valid json', () => {
    expect(safeParse('"a: 1}')).toBeNull();
  });

  it('should return null if the parsed string is text', () => {
    expect(safeParse('text')).toBeNull();
  });
});
