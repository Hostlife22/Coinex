/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AssetHistoryInterval } from '../../__generated__/globalTypes';

// ====================================================
// GraphQL query operation: getCryptoHistory
// ====================================================

export interface getCryptoHistory_assetHistory {
  __typename: 'AssetHistory';
  priceUsd: string | null;
  time: number | null;
}

export interface getCryptoHistory {
  assetHistory: (getCryptoHistory_assetHistory | null)[] | null;
}

export interface getCryptoHistoryVariables {
  id: string;
  interval: AssetHistoryInterval;
}
