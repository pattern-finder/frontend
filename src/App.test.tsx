import { cleanup, render } from '@testing-library/react';
import { LoginPage } from './pages/LoginPage';

afterEach(cleanup);

test('LoginPage proposes to login before proposing to register.', () => {
  const { queryByText } = render(<LoginPage />);

  expect(queryByText(/Login/i)).toBeTruthy();
});
