import React from 'react';
import renderer from 'react-test-renderer';
import ActivityItem from '../../../src/components/Activities/ActivityItem';

test('ActivityItem snapshot', () => {
  const navigation = null;

  const activitymock = {
    item: {
      id: 1,
      message: 'Actividad de prueba 1',
    },
  };
  const activityItem = renderer
    .create(<ActivityItem activity={activitymock} navigation={navigation} />)
    .toJSON();

  expect(activityItem).toMatchSnapshot();
});
