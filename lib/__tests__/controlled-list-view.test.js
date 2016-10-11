/*global it, expect*/
/*eslint-disable react/no-multi-comp*/
import { Text } from 'react-native';
import React from 'react';
import ControlledListView from '../controlled-list-view';
import people from './__data__/people';
import renderer from 'react-test-renderer';

const renderRow = (person) => (
  <Text>{`${person.lastName}, ${person.firstName}`}</Text>
);

const renderSectionHeader = (sectionData, initial) => (
  <Text>{initial}</Text>
);

it('renders items in default sort order', () => {
  const tree = renderer.create(
    <ControlledListView
      items={people}
      renderRow={renderRow}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders items in correct sort order', () => {
  const tree = renderer.create(
    <ControlledListView
      items={people}
      sortBy={(a, b) => a.lastName < b.lastName}
      renderRow={renderRow}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('splits items into sections', () => {
  const tree = renderer.create(
    <ControlledListView
      items={people}
      sortBy={(a, b) => a.lastName < b.lastName}
      sectionBy={(person) => person.lastName[0]}
      renderRow={renderRow}
      renderSectionHeader={renderSectionHeader}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
