<h1 align="center">react-native-controlled-listview</h1>

<p align="center">
  <a title='License' href="https://raw.githubusercontent.com/FormidableLabs/react-native-controlled-listview/master/LICENSE">
    <img src='https://img.shields.io/badge/license-MIT-blue.svg' />
  </a>
  <a href="https://badge.fury.io/js/react-native-controlled-listview">
    <img src="https://badge.fury.io/js/react-native-controlled-listview.svg" alt="npm version" height="18">
  </a>
  <img src='https://img.shields.io/badge/android-supported-brightgreen.svg' />
  <img src='https://img.shields.io/badge/iOS-supported-brightgreen.svg' />
</p>

<h4 align="center">
  The standard React Native ListView you know and love, with a declarative Flux-friendly API
</h4>

***

### Why?

For performance reasons, React Native [`ListView`](https://facebook.github.io/react-native/docs/listview.html) needs a  [`ListView.DataSource`](https://facebook.github.io/react-native/docs/listviewdatasource.html), so it can efficiently update itself. To benefit from these optimisations, any component wishing to render a `ListView` needs to be stateful to hold the DataSource, and faff about with lifecycle methods to update it.

This library hides that statefulness and provides a simple, props-based API to render ListViews.

### How-to

Installation:
```
npm i --save react-native-controlled-listview
```

Instead of `dataSource`, controlled `ListView` expects an array prop `items`. Optionally, you can sort the list with `sortBy` or group it into sections with `sectionBy`:

```diff
- import { ListView } from 'react-native';
+ import ListView from 'react-native-controlled-listview';

// stateless function component
export default (props) => (
+ <ListView
-   dataSource=...
+   items={props.people}
+   sortBy={(person) => person.lastName}
+   sectionBy={(person) => person.lastName[0]}
    renderRow={(person) => (
      <Text style={styles.row}>{person.lastName}, {person.firstName}</Text>
    )}
    renderSectionHeader={(sectionData, initial) => (
      <Text style={styles.sectionHeader}>{initial}</Text>  
    )}
  />
);
```

## Immutability

There is one gotcha. This component **expects you to clone the `items` prop** when you want to ListView to update. If you are using Redux, this should already be the case.

The `items` prop can be an instance of `Immutable.List`, or an array. If using plain arrays, never mutate it in-place, or the ListView won't update.

See [`dataSourceShouldUpdate`](#datasourceshouldupdate) on how to customise the update logic.

## Props

##### `items : any[] | Immutable.List` **(required)**

List data source.

##### `sortBy : (a, b) => number | boolean`

Sorts the list based on a comparator. Value can be one of type:
 * `(a, b) => number` a standard [`Array#sort compareFunction.`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
 * `(a, b) => boolean` a shorthand comparator: if returns true, `a` comes first; if false, `b` comes first.

##### `sectionBy : (a, b) => string`

Groups the list based on returned value and renders section headers for each group.

If using `sectionBy`, you must also provide [`renderSectionHeader`](https://facebook.github.io/react-native/docs/listview.html#rendersectionheader)

##### `rowHasChanged : (prevItem, nextItem) => boolean`

Passed directly to [`ListView.DataSource`](https://facebook.github.io/react-native/docs/listviewdatasource.html). constructor. Defaults to `!Immutable.is(prevItem, nextItem)`, which performs a `===` comparison for plain objects.

##### `sectionHeaderHasChanged : (prevSectionData, nextSectionData) => boolean`

Passed directly to [`ListView.DataSource`](https://facebook.github.io/react-native/docs/listviewdatasource.html). constructor. Defaults to `prev !== next`.

##### `dataSourceShouldUpdate : (prevProps, nextProps) => boolean`

Controls when the data source should be updated. The default implementation is `!Immutable.is(prevProps.items, nextProps.items)`, which performs a `===` comparison for plain arrays.

##### [`...ListView.props`](https://facebook.github.io/react-native/docs/listview.html#props)

All other properties, except `dataSource` are passed directly to the underlying ListView.

## Please note

This project is in a pre-release state. The API may be considered relatively stable, but changes may still occur.

[MIT licensed](LICENSE)
