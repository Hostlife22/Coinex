import cn from 'classnames';
import millify from 'millify';
import { FormEvent, useEffect, useRef, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../app/hooks';
import { getNewDeposit } from '../../common/helpers/getNewDeposit';
import { Button, Card, Htag, Input, UserForm } from '../../components';
import { usePutStatisticMutation } from '../../features/statistic/statisticApiSlice';
import { selectStatistic } from '../../features/statistic/statisticSlice';
import { useAuth } from '../../hooks/useAuth';
import { IWallet } from './Wallet.interface';

import './Wallet.scss';

const Wallet = () => {
  const selectedStatistic = useAppSelector(selectStatistic);
  const [updateStatistic, { isLoading }] = usePutStatisticMutation();
  const withdrawRef = useRef<HTMLInputElement>(null);
  const depositRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const [wallet, setWallet] = useState<IWallet>({
    deposit: 0,
    withdraw: 0,
    total: 0,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const atribute = (e.target as HTMLFormElement).getAttribute('id') || '';
    const values = {
      deposit: Number(depositRef.current?.value) || 0,
      withdraw: Number(withdrawRef.current?.value) || 0,
    };

    const [data, isChanged] = getNewDeposit({ atribute, wallet, values, logger: toast.error });

    if (isChanged) {
      setWallet(data);

      await updateStatistic({
        userId: user?.user?.userId || '',
        statistics: { ...selectedStatistic, transaction: data },
      });
    }
  };

  useEffect(() => {
    setWallet({
      deposit: selectedStatistic?.transaction?.deposit || 0,
      withdraw: selectedStatistic?.transaction?.withdraw || 0,
      total: selectedStatistic?.transaction?.total || 0,
    });
  }, [selectedStatistic]);

  return (
    <div className="wallet">
      <Card className="wallet__container">
        <Htag className="wallet__title" tag="h1">
          Wallet
        </Htag>
        <div className="wallet__wrapper">
          <Card className="wallet__card">
            <Htag tag="h2">Deposit</Htag>
            <Htag tag="h3" data-testid="deposit-cart">
              $ {millify(wallet.deposit)}
            </Htag>
          </Card>
          <Card className="wallet__card">
            <Htag tag="h2">Withdraw</Htag>
            <Htag tag="h3" data-testid="withdraw-cart">
              $ {millify(wallet.withdraw)}
            </Htag>
          </Card>
          <Card className="wallet__card">
            <Htag tag="h2">Balance</Htag>
            <Htag tag="h3" data-testid="balance-cart">
              $ {millify(wallet.total)}
            </Htag>
          </Card>
        </div>

        <UserForm className="wallet__form" onSubmit={handleSubmit} id={'deposit'} data-testid="deposit">
          <Input
            className="wallet__input"
            label="Deposit"
            name="deposit"
            type="number"
            ref={depositRef}
            data-testid="input-deposit"
          />
          <Button
            className={cn('wallet__btn', { wallet__btn_disabled: isLoading })}
            appearance="primary"
            data-testid="submit-deposit">
            {isLoading ? <ClipLoader size={16} /> : 'Deposit'}
          </Button>
        </UserForm>
        <UserForm className="wallet__form" onSubmit={handleSubmit} id={'withdraw'} data-testid="withdraw">
          <Input
            className="wallet__input"
            label="Withdraw"
            name="withdraw"
            type="number"
            ref={withdrawRef}
            data-testid="input-withdraw"
          />
          <Button
            className={cn('wallet__btn', { wallet__btn_disabled: isLoading })}
            appearance="primary"
            data-testid="submit-withdraw">
            {isLoading ? <ClipLoader size={16} /> : 'Withdraw'}
          </Button>
        </UserForm>
      </Card>
    </div>
  );
};

export default Wallet;
