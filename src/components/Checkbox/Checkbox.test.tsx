import { render, screen } from '@testing-library/react';
import Checkbox from './Checkbox';

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
});
