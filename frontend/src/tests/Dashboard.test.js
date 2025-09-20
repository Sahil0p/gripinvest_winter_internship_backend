import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../features/store';
import Dashboard from '../pages/Dashboard';

test('renders dashboard page heading', () => {
  render(
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
});
