import { render, screen } from '@testing-library/react';
import millify from 'millify';
import { ICoin } from '../../common/crypto.interface';
import { formatAsPercent } from '../../common/helpers/formatAsPercent';
import CryptoDetails from './CryptoDetails';

const props: ICoin = {
  changePercent24Hr: '11.1396468666099453',
  explorer: 'https://etherscan.io/token/0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206',
  id: 'nexo',
  marketCapUsd: '559031729.7730085185576993',
  maxSupply: '1000000000.0000000000000000',
  name: 'Nexo',
  priceUsd: '0.9982709264143363',
  rank: '71',
  supply: '560000011.0000000000000000',
  symbol: 'NEXO',
  volumeUsd24Hr: '2235936.9682112371670546',
  vwap24Hr: '0.9574925376115594',
};

describe('CryptoDetails', () => {
  it('shoud check for all titles', () => {
    render(<CryptoDetails {...props} />);

    const title = screen.getByText(/Nexo Value Statistics/i);
    const subTitle = screen.getByText(/Other Statistics/i);

    expect(title).toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();
  });

  it('shoud check for all icons', () => {
    render(<CryptoDetails {...props} />);

    expect(screen.getByTestId('dollar')).toBeDefined();
    expect(screen.getByTestId('number')).toBeDefined();
    expect(screen.getByTestId('thunderbolt')).toBeDefined();
    expect(screen.getByTestId('market')).toBeDefined();
    expect(screen.getByTestId('alltime')).toBeDefined();
    expect(screen.getByTestId('vwap')).toBeDefined();
    expect(screen.getByTestId('fund')).toBeDefined();
    expect(screen.getByTestId('circle')).toBeDefined();
    expect(screen.getByTestId('exclamation')).toBeDefined();
    expect(screen.getByTestId('total')).toBeDefined();
    expect(screen.getByTestId('total')).toBeDefined();
    expect(screen.getByTestId('circulation')).toBeDefined();
  });

  it('shoud check for all values', () => {
    render(<CryptoDetails {...props} />);

    const { priceUsd, rank, volumeUsd24Hr, marketCapUsd, vwap24Hr, changePercent24Hr, supply, maxSupply } =
      props;
    const changedPercent = formatAsPercent(+changePercent24Hr);
    const circulatingSupply = `$ ${millify(Number(maxSupply))}`;
    const marketPrice = `$ ${millify(Number(priceUsd))}`;
    const volumeUsd24 = `$ ${millify(Number(volumeUsd24Hr))}`;
    const marketCap = `$ ${millify(Number(marketCapUsd))}`;
    const dailyAvg = `$ ${millify(Number(vwap24Hr))}`;
    const totalSupply = `$ ${millify(Number(supply))}`;
    const VWAP = `$${millify(+vwap24Hr)}`;
    const aprrovedSupply = screen.getByTestId('circle');
    const coinRank = rank;

    expect(screen.getAllByText(marketPrice)[0]).toBeInTheDocument();
    expect(screen.getByText(coinRank)).toBeInTheDocument();
    expect(screen.getByText(volumeUsd24)).toBeInTheDocument();
    expect(screen.getByText(changedPercent)).toBeInTheDocument();
    expect(screen.getByText(circulatingSupply)).toBeInTheDocument();
    expect(screen.getByText(marketCap)).toBeInTheDocument();
    expect(screen.getAllByText(dailyAvg)[1]).toBeInTheDocument();
    expect(screen.getByText(totalSupply)).toBeInTheDocument();
    expect(screen.getByText(VWAP)).toBeInTheDocument();
    expect(aprrovedSupply).toBeDefined();
  });
});
