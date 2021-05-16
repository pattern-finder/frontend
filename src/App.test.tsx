import { cleanup, render } from '@testing-library/react';
import { LoginPage } from './pages/Login/LoginPage';

afterEach(cleanup);

test('LoginPage proposes to login before proposing to register.', () => {
  const {queryByText} = render(
    <LoginPage />
  );

  expect(queryByText(/login/i)).toBeTruthy();

})
