import { FaBell, FaChartArea, FaChartLine, FaHome, FaWallet } from 'react-icons/fa';

export const menuList = [
  {
    id: 1,
    title: 'Dashboard',
    icon: <FaHome />,
  },
  {
    id: 2,
    title: 'Revenue',
    icon: <FaChartArea />,
  },
  {
    id: 3,
    title: 'Notifications',
    icon: <FaBell />,
  },
  {
    id: 4,
    title: 'Analytics',
    icon: <FaChartLine />,
  },
  {
    id: 5,
    title: 'Wallets',
    icon: <FaWallet />,
  },
];
