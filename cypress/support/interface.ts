export interface IUser {
  email: string;
  password: string;
}

export interface IUserRegister {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  password?: string;
}
