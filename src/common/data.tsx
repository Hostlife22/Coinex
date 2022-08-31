import { FaChartArea, FaHome, FaWallet } from 'react-icons/fa';
import icon from '../assets/user.png';

export const menuList = [
  {
    id: 1,
    title: 'Dashboard',
    route: '/',
    icon: <FaHome />,
  },
  {
    id: 2,
    title: 'Revenue',
    route: '/revenue',
    icon: <FaChartArea />,
  },
  {
    id: 3,
    title: 'Wallet',
    route: '/wallet',
    icon: <FaWallet />,
  },
];

export const todayExpenses = [
  {
    id: 1,
    expense: 'Monero',
    time: '5:12 pm',
    location: 'Added cryptocurrency',
    price: 326.8,
    icon: icon,
    iconBackgroundColor: '#32a7e2',
  },
  {
    id: 2,
    expense: 'TRON',
    time: '3:18 pm',
    location: 'Added cryptocurrency',
    price: 15.0,
    icon: icon,
    iconBackgroundColor: '#B548C6',
  },
  {
    id: 3,
    expense: 'Litecoin',
    time: '2:22 pm',
    location: 'Added cryptocurrency',
    price: 185.75,
    icon: icon,
    iconBackgroundColor: '#FF8700',
  },
];

export const days = [
  {
    id: 2,
    day: 7,
  },
  {
    id: 3,
    day: 14,
  },
  {
    id: 4,
    day: 30,
  },
  {
    id: 5,
    day: 60,
  },
  {
    id: 6,
    day: 120,
  },
];
