export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface IUser {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

export interface IUserData extends Omit<IUser, 'password'> {}
export interface ICreatedOrUpdatedUser extends IUserData {
  id: string;
}

export interface IUpdateUser extends Partial<IUser> {
  id: string;
}
