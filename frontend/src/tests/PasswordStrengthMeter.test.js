import { render, screen } from '@testing-library/react';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

test('displays correct strength label for input score', () => {
  render(<PasswordStrengthMeter strength={4} />);
  expect(screen.getByText(/Strong/i)).toBeInTheDocument();
});
