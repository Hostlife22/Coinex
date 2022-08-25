/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCrypto
// ====================================================

export interface getCrypto_asset {
  __typename: "Asset";
  id: string | null;
  rank: string | null;
  symbol: string | null;
  name: string | null;
  supply: string | null;
  maxSupply: string | null;
  marketCapUsd: string | null;
  volumeUsd24Hr: string | null;
  priceUsd: string | null;
  changePercent24Hr: string | null;
  vwap24Hr: string | null;
}

export interface getCrypto {
  asset: getCrypto_asset | null;
}

export interface getCryptoVariables {
  id: string;
}
