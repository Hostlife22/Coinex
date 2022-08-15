import { Omit } from '../user/user.interface';

export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ISignInResponse {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface IAuthPayload extends Omit<ISignInResponse, 'message'> {}

export interface IAuthTokens {
  refreshToken: string;
  token: string;
}

export interface IAuthTokensState {
  refreshToken: string | null;
  token: string | null;
}

export interface IUserState {
  userId: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
}

export interface IAuthState {
  user: IUserState;
  tokens: IAuthTokensState;
  newAccount: boolean;
}
