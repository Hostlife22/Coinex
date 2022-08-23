import { getNewDeposit } from '../../common/helpers/getNewDeposit';

const inputData = {
  atribute: 'deposit',
  wallet: {
    withdraw: 2000,
    deposit: 4000,
    total: 2000,
  },
  logger: (message: string) => {
    console.log(message);
    return message;
  },
};

describe('getNewDeposit', () => {
  const log = console.log;
  beforeEach(() => {
    console.log = jest.fn();
  });
  afterAll(() => {
    console.log = log;
  });

  it('should return a message "You can\'t deposit 0 or less" and an array if the deposit is negative', () => {
    const values = { deposit: -1000, withdraw: 0 };
    const result = getNewDeposit({ ...inputData, values });

    expect(console.log).toHaveBeenCalledWith("You can't deposit 0 or less");
    expect(result).toEqual([{ deposit: 4000, total: 2000, withdraw: 2000 }, false]);
  });

  it('should return an array with updated data increase "total" and "withdraw"', () => {
    const values = { deposit: 2000, withdraw: 0 };
    const result = getNewDeposit({ ...inputData, values });

    expect(result).toEqual([{ deposit: 6000, total: 4000, withdraw: 2000 }, true]);
  });

  it('should return a message "You don\'t have any balance to withdraw" and an array if withdraw is 0', () => {
    const values = { deposit: 0, withdraw: 0 };
    const result = getNewDeposit({ ...inputData, values, atribute: 'withdraw' });

    expect(console.log).toHaveBeenCalledWith("You don't have any balance to withdraw");
    expect(result).toEqual([{ deposit: 4000, total: 2000, withdraw: 2000 }, false]);
  });

  it('should return message "You don\'t have enough balance to withdraw" and array if withdraw is more than balance', () => {
    const values = { deposit: 0, withdraw: 3000 };
    const result = getNewDeposit({ ...inputData, values, atribute: 'withdraw' });

    expect(console.log).toHaveBeenCalledWith("You don't have enough balance to withdraw");
    expect(result).toEqual([{ deposit: 4000, total: 2000, withdraw: 2000 }, false]);
  });

  it('should return an array with updated data, decrement "total" and increment "withdraw"', () => {
    const values = { deposit: 0, withdraw: 1000 };
    const result = getNewDeposit({ ...inputData, values, atribute: 'withdraw' });

    expect(result).toEqual([{ deposit: 4000, total: 1000, withdraw: 3000 }, true]);
  });
});
