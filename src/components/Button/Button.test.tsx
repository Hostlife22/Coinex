import { render, screen } from '@testing-library/react';
import Button from './Button';

it('should get the button with the passed text', () => {
  render(<Button appearance="primary">my btn</Button>);

  const btn = screen.getByText(/my btn/i);
  expect(btn).toBeInTheDocument();
});
