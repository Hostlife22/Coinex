import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { setupApiStore } from '../../app/api/setupApiStore';
import { userApi } from '../../app/api/userApi';
import authReducer from '../../features/auth/authSlice';

interface IProps {
  children: ReactNode;
}

interface IRouterProvider extends IProps {
  route: string;
}

export const Wrapper = ({ children }: IProps) => {
  const storeRef = setupApiStore(userApi, { auth: authReducer });
  return <Provider store={storeRef.store}>{children}</Provider>;
};

export const RouterProvider = ({ children, route }: IRouterProvider) => (
  <MemoryRouter initialEntries={[route]}>
    <Routes>
      <Route path={route} element={children} />
    </Routes>
  </MemoryRouter>
);

export const ElemProvider = ({ children, route }: IRouterProvider) => {
  return (
    <Wrapper>
      <RouterProvider route={route}>{children}</RouterProvider>
    </Wrapper>
  );
};
