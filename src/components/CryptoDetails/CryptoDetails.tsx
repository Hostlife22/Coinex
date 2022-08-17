import millify from 'millify';
import {
  AiOutlineCheckCircle,
  AiOutlineDollar,
  AiOutlineExclamationCircle,
  AiOutlineFund,
  AiOutlineNumber,
  AiOutlineThunderbolt,
  AiOutlineTrophy,
} from 'react-icons/ai';
import { formatAsPercent } from '../../common/helpers';
import Htag from '../Htag/Htag';
import Ptag from '../Ptag/Ptag';
import { ICryptoDetailsProps } from './CryptoDetails.interface';
import './CryptoDetails.scss';

const CryptoDetails = ({
  priceUsd,
  rank,
  volumeUsd24Hr,
  marketCapUsd,
  vwap24Hr,
  name,
  supply,
  maxSupply,
  changePercent24Hr,
}: ICryptoDetailsProps) => {
  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${millify(Number(priceUsd))}`,
      icon: <AiOutlineDollar />,
    },
    { title: 'Rank', value: rank, icon: <AiOutlineNumber /> },
    {
      title: '24h Volume',
      value: `$ ${millify(Number(volumeUsd24Hr))}`,
      icon: <AiOutlineThunderbolt />,
    },
    {
      title: 'Market Cap',
      value: `$ ${millify(Number(marketCapUsd))}`,
      icon: <AiOutlineDollar />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${millify(Number(vwap24Hr))}`,
      icon: <AiOutlineTrophy />,
    },
  ];

  const genericStats = [
    { title: 'VWAP(24hr)', value: `$${millify(+vwap24Hr)}`, icon: <AiOutlineDollar /> },
    {
      title: 'Change Percent(24hr) ',
      value: formatAsPercent(+changePercent24Hr),
      icon: <AiOutlineFund />,
    },
    {
      title: 'Aprroved Supply',
      value: <AiOutlineCheckCircle />,
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: 'Total Supply',
      value: `$ ${millify(Number(supply))}`,
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: 'Circulating Supply',
      value: maxSupply ? `$ ${millify(Number(maxSupply))}` : '-',
      icon: <AiOutlineExclamationCircle />,
    },
  ];
  return (
    <div className="cryptodetails">
      <div className="cryptodetails__statistics">
        <div className="cryptodetails__heading">
          <Htag tag={'h2'} className="cryptodetails__title">
            {name} Value Statistics
          </Htag>
        </div>
        {stats.map(({ title, icon, value }) => (
          <div className="cryptodetails__stats" key={title}>
            <div className="cryptodetails__stats-name">
              <Ptag size="s">{icon}</Ptag>
              <Ptag size="s">{title}</Ptag>
            </div>
            <Ptag size="s">{value}</Ptag>
          </div>
        ))}
      </div>
      <div className="cryptodetails__statistics">
        <div className="cryptodetails__heading">
          <Htag tag={'h2'} className="cryptodetails__title">
            Other Statistics
          </Htag>
        </div>
        {genericStats.map(({ icon, title, value }) => (
          <div className="cryptodetails__stats" key={title}>
            <div className="cryptodetails__stats-name">
              <Ptag size="s">{icon}</Ptag>
              <Ptag size="s">{title}</Ptag>
            </div>
            <Ptag size="s">{value}</Ptag>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoDetails;
