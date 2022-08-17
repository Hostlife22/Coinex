import millify from 'millify';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Button, Card, Htag, Input, UserForm } from '../../components';
import './Wallet.scss';

const Wallet = () => {
  const [store, setStore] = useState({
    deposit: 0,
    withdraw: 0,
    balance: 0,
  });
  const [formData, setFormData] = useState<{ deposit: number; withdraw: number }>({
    deposit: 0,
    withdraw: 0,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const atribute = (e.target as HTMLFormElement).getAttribute('id');
    if (atribute === 'deposit') {
      setStore({
        ...store,
        balance: store.balance + formData.deposit,
      });
      setFormData({
        ...formData,
        deposit: 0,
      });
    }
    if (atribute === 'withdraw') {
      setStore({
        ...store,
        balance: store.balance - formData.withdraw,
      });
      setFormData({
        ...formData,
        withdraw: 0,
      });
    }
  };

  console.log(formData);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const newValue = event.target.value;
      const inputName = event.target.name;
      setFormData((prev) => ({ ...prev, [inputName]: +newValue }));
    },
    [],
  );

  return (
    <div className="wallet">
      <Card className="wallet__container">
        <div className="wallet__wrapper">
          <Card className="wallet__card">
            <Htag tag="h2">Deposit</Htag>
            <Htag tag="h3">$ {store.deposit}</Htag>
          </Card>
          <Card className="wallet__card">
            <Htag tag="h2">Withdraw</Htag>
            <Htag tag="h3">$ {millify(store.withdraw)}</Htag>
          </Card>
          <Card className="wallet__card">
            <Htag tag="h2">Balance</Htag>
            <Htag tag="h3">$ {store.balance}</Htag>
          </Card>
        </div>

        <UserForm className="wallet__form" onSubmit={handleSubmit} id={'deposit'}>
          <Input
            className="wallet__input"
            label="Deposit"
            name="deposit"
            onChange={handleOnChange}
            value={formData.deposit}
          />
          <Button className="wallet__btn" appearance="primary">
            Deposit
          </Button>
        </UserForm>
        <UserForm className="wallet__form" onSubmit={handleSubmit} id={'withdraw'}>
          <Input
            className="wallet__input"
            label="Withdraw"
            name="withdraw"
            onChange={handleOnChange}
            value={formData.withdraw}
          />
          <Button className="wallet__btn" appearance="primary">
            Withdraw
          </Button>
        </UserForm>
      </Card>
    </div>
  );
};

export default Wallet;
