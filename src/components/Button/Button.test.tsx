import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

const onClick = jest.fn();

describe('button component', () => {
  it('renders button component  with the passed text', () => {
    render(<Button appearance="primary">my btn</Button>);
    const btn = screen.getByText(/my btn/i);

    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass('btn');
  });

  it('onClick works', () => {
    render(
      <Button appearance="primary" onClick={onClick}>
        my btn
      </Button>,
    );

    userEvent.click(screen.getByText(/my btn/i));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('dinamyc style change works, appearance is primary', () => {
    render(
      <Button appearance="primary" className="custom">
        my btn
      </Button>,
    );
    const btn = screen.getByText(/my btn/i);

    expect(btn).toHaveClass('custom');
    expect(btn).toHaveClass('btn');
    expect(btn).toHaveClass('primary');
  });

  it('dinamyc style change works, appearance is ghost', () => {
    render(<Button appearance="ghost">my btn</Button>);
    const btn = screen.getByText(/my btn/i);

    expect(btn).toHaveClass('btn');
    expect(btn).toHaveClass('ghost');
  });

  it('dinamyc style change works, appearance is secondary', () => {
    render(<Button appearance="secondary">my btn</Button>);
    const btn = screen.getByText(/my btn/i);

    expect(btn).toHaveClass('btn');
    expect(btn).toHaveClass('secondary');
  });

  it('button snapshot', () => {
    const view = render(
      <Button appearance="primary" className="custom">
        my btn
      </Button>,
    );

    expect(view).toMatchSnapshot();
  });
});
