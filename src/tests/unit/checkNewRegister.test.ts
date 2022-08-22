import { checkNewRegister } from '../../common/helpers/checkNewRegister';

describe('Check new register', () => {
  it('should return null if userId is null', () => {
    const userId = null;
    const result = checkNewRegister(userId);

    expect(result).toBe(null);
  });

  it('should return userId if userId is not null', () => {
    const userId = '122443233223';
    const result = checkNewRegister(userId);

    expect(result).toBe(userId);
  });
});
