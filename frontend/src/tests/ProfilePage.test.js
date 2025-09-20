import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../features/store';
import ProfilePage from '../pages/ProfilePage';

test('renders profile page heading', () => {
  render(
    <Provider store={store}>
      <ProfilePage />
    </Provider>
  );
  expect(screen.getByText(/Profile/i)).toBeInTheDocument();
});
