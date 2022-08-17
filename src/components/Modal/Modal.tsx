import cn from 'classnames';
import { ChangeEvent, useMemo, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { incrementChar } from '../../common/helpers';
import Button from '../Button/Button';
import Card from '../Card/Card';
import Htag from '../Htag/Htag';
import Input from '../Input/Input';
import Ptag from '../Ptag/Ptag';
import UserPanel from '../UserPanel/UserPanel';
import { IModalProps } from './Modal.interface';
import './Modal.scss';

const Modal = ({ handleClose, data, isOpen, openId }: IModalProps) => {
  if (!data) {
    return null;
  }
  const [amount, setAmount] = useState<string>('');
  const balance = 10;
  const allowableAmount = balance / Number(data.priceUsd);
  const allowableAmountString = useMemo(() => incrementChar(+allowableAmount.toFixed(2)), [allowableAmount]);
  const isAllowable = allowableAmount > 0;
  const message = isAllowable
    ? `You can buy: ${allowableAmount.toFixed(2)} ${data.symbol}`
    : 'You have no enough balance';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (+value > allowableAmount) {
      setAmount(allowableAmountString);
    } else {
      setAmount(value);
    }
  };
  return (
    <div className={cn('modal', { modal_active: isOpen })}>
      <div className="modal__overlay" onClick={() => handleClose()} />
      <Card className="modal__content">
        <UserPanel className="modal__user" />
        <Htag tag="h2" className="modal__title">
          Add cryptocurrency to wallet
        </Htag>
        <Ptag size="l">Selected cryptocurrency {`- ${openId}`}</Ptag>
        <Ptag size="l">{message}</Ptag>
        <Input
          className={cn('modal__input', { modal__disabled: !isAllowable })}
          type="number"
          value={amount}
          onChange={handleChange}
          label="Quantity:"
        />
        <Button appearance="primary" className={cn('modal__btn', { modal__disabled: !isAllowable })}>
          Аdd to wallet
        </Button>
      </Card>
      <Button appearance="primary" onClick={() => handleClose()} className="modal__close-btn">
        <AiOutlineCloseCircle />
      </Button>
    </div>
  );
};

export default Modal;
