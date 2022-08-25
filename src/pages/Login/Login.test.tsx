import { render, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { setupApiStore } from '../../app/api/setupApiStore';
import { userApi } from '../../app/api/userApi';
import authReducer from '../../features/auth/authSlice';
import Login from './Login';

beforeEach((): void => {
  fetchMock.resetMocks();
});

const Wrapper = ({ children }: { children: ReactNode }) => {
  const storeRef = setupApiStore(userApi, { auth: authReducer });
  return <Provider store={storeRef.store}>{children}</Provider>;
};

const Element = () => (
  <MemoryRouter initialEntries={['/auth']}>
    <Routes>
      <Route path="/auth" element={<Login />} />
    </Routes>
  </MemoryRouter>
);

describe('login page', () => {
  it('full page rendering', () => {
    render(<Element />, { wrapper: Wrapper });
    const title = screen.getAllByText(/Sign In/i)[0];

    expect(title).toBeInTheDocument();
  });

  it('should check the subtitle', () => {
    render(<Element />, { wrapper: Wrapper });
    const subTitle = screen.getByText(/Lorem ipsum dolor sit amet, consectetur adipiscing elit/i);

    expect(subTitle).toBeInTheDocument();
  });

  it('should check the form', () => {
    render(<Element />, { wrapper: Wrapper });

    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should check the description', () => {
    render(<Element />, { wrapper: Wrapper });
    const description = screen.getByText(/Don’t have an account?/i);
    const link = screen.getByText(/Click here to sign up./i);

    expect(description).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });
});
