import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';
import Loading from '../../../src/components/common/Loading';

test('Loading snapshot', () => {
  const loading = renderer
    .create(<Loading isVisible={true} text="test 1" />)
    .toJSON();

  expect(loading).toMatchSnapshot();
});
