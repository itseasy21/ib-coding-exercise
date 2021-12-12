import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createBrowserHistory } from 'history';

import configureStore from '../../store';

import { Provider } from 'react-redux';
import Login from '../Login';
import LoginBox from '../../components/LoginBox';

const procesLoginMock = jest.fn();

const history = createBrowserHistory();
const store = configureStore(history);

test('renders the Login Form on Login Page', () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  expect(screen.queryByText('Please log in below')).toBeInTheDocument();
});

test('Login Form has a Username field', () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  expect(screen.queryByLabelText('Username')).toBeInTheDocument();
});

test('Login Form has a Password field', () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  expect(screen.queryByLabelText('Password')).toBeInTheDocument();
});

test('Calls processLogin callback when clicking login', () => {
  render(
    <Provider store={store}>
      <LoginBox processLogin={procesLoginMock} />
    </Provider>
  );
  const loginButton = screen.getByText('Login');

  userEvent.click(loginButton);

  expect(procesLoginMock).toHaveBeenCalled();
});

test('Redirect to / if user is logged in', () => {
  render(
    <Provider store={store}>
      <Login isLoggedIn={true} />
    </Provider>
  );

  expect(
    screen.queryByLabelText('Please log in below')
  ).not.toBeInTheDocument();
});
