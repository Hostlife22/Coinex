import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';
import { GET_CRYPTOS } from '../../apollo/queries/cryptoQuery';
import { assets } from '../../common/data';
import { ElemProvider } from '../../common/utils/testUtils';
import Header from './Header';

let matchMedia: MatchMediaMock;
const mocks = [
  {
    request: {
      query: GET_CRYPTOS,
    },
    result: {
      data: {
        assets,
      },
    },
  },
];

const handleMenu = jest.fn();

describe('header component', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  it('renders correctly', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ElemProvider route="/">
          <Header isOpen={true} handleMenu={handleMenu} />
        </ElemProvider>
      </MockedProvider>,
    );

    expect(screen.getByTestId('header')).toBeTruthy();
    expect(screen.getByTestId('header-conies')).toBeTruthy();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('header snapshot', () => {
    const view = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ElemProvider route="/">
          <Header isOpen={true} handleMenu={handleMenu} />
        </ElemProvider>
      </MockedProvider>,
    );

    expect(view).toMatchSnapshot();
  });
});
