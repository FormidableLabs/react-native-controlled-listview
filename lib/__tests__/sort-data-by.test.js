/*global it, expect*/
import 'react-native';
import sortDataBy from '../sort-data-by';
import people from './__data__/people';

it('sorts items when given a standard array comparator', () => {
  const comparator = (a, b) => {
    if (a.lastName > b.lastName) {
      return +1;
    }
    if (b.lastName < b.lastName) {
      return -1;
    }
    return 0;
  };

  expect(sortDataBy(comparator, people)).toMatchSnapshot();
});

it('sorts items when given a boolean array comparator', () => {
  const comparator = (a, b) => {
    return a.lastName < b.lastName;
  };

  expect(sortDataBy(comparator, people)).toMatchSnapshot();
});
