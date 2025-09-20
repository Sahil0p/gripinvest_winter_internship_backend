import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import InvestPage from '../pages/InvestPage';

test('renders invest page without product redirects', () => {
  render(
    <BrowserRouter>
      <InvestPage />
    </BrowserRouter>
  );
  // Without product in location state, component returns null and redirects - no heading
  expect(screen.queryByText(/Invest in/i)).toBeNull();
});
