import React from 'react';
import renderer from 'react-test-renderer';
import LoginForm from '../../../src/components/Account/LoginForm';

test('LogingForm snapshot', () => {
  const loginForm = renderer.create(<LoginForm />).toJSON();

  expect(loginForm).toMatchSnapshot();
});
