import React from 'react';
import renderer from 'react-test-renderer';
import RegisterForm from '../../../src/components/Account/RegisterForm';

test('RegisterForm snapshot', () => {
  const registerForm = renderer.create(<RegisterForm />).toJSON();

  expect(registerForm).toMatchSnapshot();
});
