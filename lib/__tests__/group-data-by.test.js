/*global it, expect*/
import 'react-native';
import groupDataBy from '../group-data-by';
import people from './__data__/people';

it('groups items based on the provided function', () => {
  expect(groupDataBy((person) => person.lastName[0], people)).toMatchSnapshot();
});
