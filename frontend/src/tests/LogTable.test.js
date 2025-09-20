import { render, screen } from '@testing-library/react';
import LogTable from '../components/LogTable';

const sampleLogs = [
  {
    id: 1,
    created_at: "2025-09-20T09:00:00Z",
    user_id: "user123",
    endpoint: "/api/products",
    http_method: "GET",
    status_code: 200,
    error_message: null,
  },
];

test('renders log table with logs', () => {
  render(<LogTable logs={sampleLogs} />);
  expect(screen.getByText(/\/api\/products/)).toBeInTheDocument();
  expect(screen.getByText(/GET/)).toBeInTheDocument();
});
