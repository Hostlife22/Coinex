import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';
import * as reduxHooks from 'react-redux';
import { GET_CRYPTOS } from '../../apollo/queries/cryptoQuery';
import { assets } from '../../common/data';
import { Wrapper } from '../../common/utils/testUtils';
import Currency from './Currency';

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

jest.mock('react-redux');

describe('currency component', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  it('renders correctly', () => {
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue('');
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Wrapper>
          <Currency />
        </Wrapper>
      </MockedProvider>,
    );
  });
});
