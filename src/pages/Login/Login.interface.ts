export interface ILoginForm {
  email: string;
  password: string;
}

interface IFromLocation {
  pathname: string;
}

export interface IAuthLocationState {
  from: IFromLocation;
}

export interface LocationParams {
  pathname: string;
  state: IAuthLocationState | null;
  search: string;
  hash: string;
  key: string;
}
