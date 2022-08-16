import { useState } from 'react';
import { Bar, BarChart, Cell, ResponsiveContainer } from 'recharts';
import icon from '../../assets/user.png';

import { FaCartPlus } from 'react-icons/fa';
import { dataChart, previousExpenses, todayExpenses } from '../../common/data';
import { Card, Htag, Ptag } from '../../components';
import './Revenue.scss';

function Expenses() {
  const [activeIndex, setActiveIndex] = useState(0);

  const onMouseOver = (data: any, index: number) => setActiveIndex(index);

  return (
    <div className="revenue">
      <Card className="revenue__container">
        <div className={'revenue__overview'}>
          <Htag tag="h2" className="revenue__date-range">
            01 - 18 August, 2022
          </Htag>
          <ResponsiveContainer width="100%" height="9%">
            <BarChart data={dataChart}>
              <Bar dataKey="uv" fill="rgba(21, 122, 255, .2)" onMouseOver={onMouseOver}>
                {dataChart.map((entry, index) => (
                  <Cell
                    cursor="pointer"
                    fill={index === activeIndex ? 'rgb(21, 122, 255)' : 'rgba(21, 122, 255, .2)'}
                    key={index}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <ul>
            {todayExpenses.map((expense) => (
              <li className={'revenue__item'} key={expense.id}>
                <div className={'revenue__item-left'}>
                  <div
                    style={{ backgroundColor: expense.iconBackgroundColor }}
                    className={'revenue__item-div'}>
                    <img src={icon} alt={expense.expense} />
                  </div>
                  <div className={'revenue__item-details'}>
                    <Ptag className={'revenue__item-title'}>{expense.expense}</Ptag>
                    <Ptag className="revenue__item-time">
                      {expense.time} • {expense.location}
                    </Ptag>
                  </div>
                </div>
                <p className={'revenue__item-price'}>{expense.price.toFixed(2)}</p>
              </li>
            ))}
          </ul>

          <div className={'revenue__overview-header'}>
            <Htag tag="h3" className={'revenue__overview-title'}>
              Monday, 18 August 2022
            </Htag>
            <button>
              <img className={'revenue__option'} src={icon} alt="options" />
            </button>
          </div>

          <ul>
            {previousExpenses.map((expense) => (
              <li className={'revenue__item'} key={expense.id}>
                <div className={'revenue__item-left'}>
                  <div
                    style={{ backgroundColor: expense.iconBackgroundColor }}
                    className={'revenue__item-div'}>
                    <FaCartPlus />
                  </div>
                  <div className={'revenue__item-details'}>
                    <Ptag className={'revenue__item-title'}>{expense.expense}</Ptag>
                    <Ptag className={'revenue__item-time'}>
                      {expense.time} • {expense.location}
                    </Ptag>
                  </div>
                </div>
                <Ptag className={'revenue__item-price'}>{expense.price.toFixed(2)}</Ptag>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}

export default Expenses;
