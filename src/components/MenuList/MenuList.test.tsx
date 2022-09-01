import { render, screen } from '@testing-library/react';
import { ElemProvider } from '../../common/utils/testUtils';
import MenuList from './MenuList';

describe('MenuList component', () => {
  it('renders correctly', () => {
    render(
      <ElemProvider route="/">
        <MenuList />
      </ElemProvider>,
    );

    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/revenue/i)).toBeInTheDocument();
    expect(screen.getByText(/wallet/i)).toBeInTheDocument();
  });

  it('renders correctly with custom className', () => {
    render(
      <ElemProvider route="/">
        <MenuList />
      </ElemProvider>,
    );

    const activeLink = screen.getByRole('link', { current: 'page' });

    expect(activeLink).toBeInTheDocument();
    expect(activeLink).toHaveTextContent(/dashboard/i);
  });

  it('MenuList snapshot', () => {
    const view = render(
      <ElemProvider route="/">
        <MenuList />
      </ElemProvider>,
    );

    expect(view).toMatchSnapshot();
  });
});
