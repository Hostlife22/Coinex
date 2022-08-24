import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from './Checkbox';

const onClick = jest.fn();

describe('checkbox', () => {
  it('should get checkbox', () => {
    render(<Checkbox label="" />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('should get the text in the label', () => {
    render(<Checkbox label="test" />);

    const label = screen.getByText(/test/i);
    expect(label).toBeInTheDocument();
  });

  it('onClick works', () => {
    render(<Checkbox label="test" onClick={onClick} />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    expect(checkbox.checked).toEqual(false);
    userEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
    userEvent.click(checkbox);
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('dinamyc styles works', () => {
    render(<Checkbox label="test" className="custom" />);

    expect(screen.getByTestId('checkbox')).toHaveClass('checkbox');
    expect(screen.getByTestId('checkbox')).toHaveClass('custom');
  });

  it('checkbox snapshot', () => {
    const view = render(<Checkbox label="test" />);

    expect(view).toMatchSnapshot();
  });
});
