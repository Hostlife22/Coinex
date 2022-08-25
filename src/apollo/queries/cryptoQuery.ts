import { gql } from '@apollo/client';

const GET_CRYPTOS = gql`
  query getCryptos {
    assets {
      id
      rank
      symbol
      name
      supply
      maxSupply
      marketCapUsd
      volumeUsd24Hr
      priceUsd
      changePercent24Hr
      vwap24Hr
    }
  }
`;

const GET_CRYPTO = gql`
  query getCrypto($id: ID!) {
    asset(id: $id) {
      id
      rank
      symbol
      name
      supply
      maxSupply
      marketCapUsd
      volumeUsd24Hr
      priceUsd
      changePercent24Hr
      vwap24Hr
    }
  }
`;

const GET_CRYPTO_HISTORY = gql`
  query getCryptoHistory($id: ID!, $interval: AssetHistoryInterval!) {
    assetHistory(id: $id, interval: $interval) {
      priceUsd
      time
    }
  }
`;

export { GET_CRYPTOS, GET_CRYPTO, GET_CRYPTO_HISTORY };
