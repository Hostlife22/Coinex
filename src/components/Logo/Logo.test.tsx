import { render, screen } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';
import Logo from './Logo';

let matchMedia: MatchMediaMock;
const handleMenu = jest.fn();

describe('Logo component', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  it('renders logo', () => {
    const mediaQuery = '(min-width: 630px)';
    matchMedia.useMediaQuery(mediaQuery);

    render(<Logo isOpen={true} handleMenu={handleMenu} />);

    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText(/oineX/i)).toBeInTheDocument();
    expect(screen.getByTestId('toggle')).toBeInTheDocument();
  });

  it('renders logo with custom className', () => {
    const mediaQuery = '(max-width: 630px)';
    matchMedia.useMediaQuery(mediaQuery);

    render(<Logo isOpen={true} handleMenu={handleMenu} />);

    const logo = screen.getByTestId('logo');

    expect(logo).toBeDefined();
    expect(logo).toHaveClass('logo_close');
  });

  it('сheck for adding and removing the class', () => {
    const mediaQuery = '(min-width: 630px)';
    matchMedia.useMediaQuery(mediaQuery);

    const { rerender } = render(<Logo isOpen={true} handleMenu={handleMenu} />);
    const toogle = screen.getByTestId('toggle');

    expect(toogle).toBeDefined();
    expect(screen.getByTestId('logo')).toHaveClass('logo_close');

    rerender(<Logo isOpen={false} handleMenu={handleMenu} />);
    expect(screen.getByTestId('logo')).not.toHaveClass('logo_close');
  });
});
