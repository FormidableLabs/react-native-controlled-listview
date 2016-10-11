/*global it, expect*/
/*eslint-disable react/no-multi-comp*/
import { Text } from 'react-native';
import { fromJS } from 'immutable';
import { cloneDeep } from 'lodash';
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

// helper to update component props
const setProps = (component, changedProps) => {
  const instance = component.getInstance();
  const nextProps = {
    ...instance.props,
    ...changedProps
  };
  instance.componentWillReceiveProps(nextProps);
  instance.props = nextProps;
};

it('updates list when items prop is updated', () => {
  const component = renderer.create(
    <ControlledListView items={people} renderRow={renderRow} />
  );
  expect(component.toJSON()).toMatchSnapshot();

  setProps(component, { items: [people[0]] });
  expect(component.toJSON()).toMatchSnapshot();
});

it('doesn\'t update list when items are mutated in-place', () => {
  const items = cloneDeep(people);

  const component = renderer.create(
    <ControlledListView items={items} renderRow={renderRow} />
  );

  const initialSnapshot = component.toJSON();

  // mutate array in-place
  items[0].firstName = 'Poor Tony';
  items[0].lastName = 'Krause';
  items.pop();

  // expected: no change
  setProps(component, { items });
  expect(component.toJSON()).toEqual(initialSnapshot);
});

it('handles items of type Immutable.List', () => {
  const list = fromJS(people);
  const component = renderer.create(
    <ControlledListView
      items={list}
      sortBy={(a, b) => a.get('lastName') < b.get('lastName')}
      sectionBy={(person) => person.get('lastName')[0]}
      renderRow={(person) => renderRow(person.toJS())}
      renderSectionHeader={renderSectionHeader}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();

  setProps(component, { items: list.take(1) });
  expect(component.toJSON()).toMatchSnapshot();
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
