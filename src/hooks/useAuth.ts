import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { LOCALSTORAGE_KEY_USER } from '../common/constants';
import { safeParse } from '../common/helpers';
import { IAuthPayload } from '../features/auth/auth.interface';
import { selectAuth, setUser } from '../features/auth/authSlice';

export const useAuth = () => {
  const user = safeParse<IAuthPayload>(localStorage.getItem(LOCALSTORAGE_KEY_USER) || 'null');
  const { newAccount, ...userSelected } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && userSelected.tokens.token === null) {
      dispatch(setUser(user));
    }
  }, [dispatch]);

  const data = user
    ? {
        user: { firstName: user.firstName, lastName: user.lastName, phone: user.phone, userId: user.userId },
        tokens: { token: user.token, refreshToken: user.refreshToken },
      }
    : userSelected;

  return { auth: !!user || !!userSelected.tokens.token, user: data };
};
