import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

const onChange = jest.fn();

describe('Input component', () => {
  it('renders input component', () => {
    render(<Input label="Find" />);

    expect(screen.getByText(/find/i)).toBeInTheDocument();
  });

  it('custom placeholder work correctly', () => {
    render(<Input placeholder="find post" />);

    expect(screen.getByPlaceholderText(/find post/)).toBeInTheDocument();
  });

  it('onChange works', () => {
    render(<Input value="" onChange={onChange} />);

    userEvent.type(screen.getByRole('textbox'), 'React');

    expect(onChange).toHaveBeenCalledTimes(5);
  });

  it('dinamyc styles works', () => {
    render(<Input value="" onChange={onChange} error={{ type: 'validate', message: 'error' }} />);

    expect(screen.getByRole('textbox')).toHaveClass('error');
  });

  it('input snapshot', () => {
    const view = render(<Input label="Find:" />);

    expect(view).toMatchSnapshot();
  });
});
