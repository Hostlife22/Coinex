import { render, screen } from '@testing-library/react';
import Checkbox from './Checkbox';

it('should get the text in the label', () => {
  render(<Checkbox label="test" />);

  const label = screen.getByText(/test/i);
  expect(label).toBeInTheDocument();
});
