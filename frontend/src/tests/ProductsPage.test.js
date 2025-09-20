import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../features/store';
import ProductsPage from '../pages/ProductsPage';

test('renders products page heading', () => {
  render(
    <Provider store={store}>
      <ProductsPage />
    </Provider>
  );
  expect(screen.getByText(/Investment Products/i)).toBeInTheDocument();
});
