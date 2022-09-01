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

export const assets = [
  {
    changePercent24Hr: '-0.9531459061618576',
    id: 'bitcoin',
    marketCapUsd: '384272416809.1633576869052544',
    maxSupply: '21000000.0000000000000000',
    name: 'Bitcoin',
    priceUsd: '20078.6670407758580608',
    rank: '1',
    supply: '19138343.0000000000000000',
    symbol: 'BTC',
    volumeUsd24Hr: '11767298311.0331411352934547',
    vwap24Hr: '20047.9813398833409349',
  },
  {
    changePercent24Hr: '-0.6092049047470719',
    id: 'ethereum',
    marketCapUsd: '192867950347.8683166675220207',
    maxSupply: null,
    name: 'Ethereum',
    priceUsd: '1578.3522587206973047',
    rank: '2',
    supply: '122195757.8115000000000000',
    symbol: 'ETH',
    volumeUsd24Hr: '7314776175.4023835649625479',
    vwap24Hr: '1563.9320035521647996',
  },
  {
    changePercent24Hr: '0.0356120675688941',
    id: 'tether',
    marketCapUsd: '67591171110.0304165951707862',
    maxSupply: null,
    name: 'Tether',
    priceUsd: '1.0006035048613313',
    rank: '3',
    supply: '67550404112.7634700000000000',
    symbol: 'USDT',
    volumeUsd24Hr: '18737250605.4503713812882649',
    vwap24Hr: '1.0003927680924454',
  },
];
