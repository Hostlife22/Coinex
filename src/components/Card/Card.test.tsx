import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('card component', () => {
  it('renders a child node inside a component', () => {
    render(<Card>Card test</Card>);

    const childrenNode = screen.getByText(/Card test/i);

    expect(childrenNode).toBeInTheDocument();
  });

  it('should get rendered markup', () => {
    render(
      <Card>
        <div>
          <form>
            <input type="text" placeholder="value" />
            <button type="submit">Add</button>
          </form>
        </div>
      </Card>,
    );

    const btn = screen.getByRole('button');
    const input = screen.getByPlaceholderText(/value/i);

    expect(btn).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
});
