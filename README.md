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

`react-native-controlled-listview` hides this statefulness and provides a simple `props` based way to render ListViews.

### How-to

Installation:
```
npm i --save react-native-controlled-listview
```

Instead of `dataSource`, controlled `ListView` expects an array prop `items`. Optionally, you can sort the list with `sortBy` or group it into sections (iOS only) with `sectionBy`:

```diff
- import { ListView } from 'react-native';
+ import ListView from 'react-native-controlled-listview';

const renderRow = (person) => (
  <Text style={styles.row}>{person.lastName}, {person.firstName}</Text>
);

const renderSectionHeader = (initial) => (
  <Text style={styles.sectionHeader}>{initial}</Text>  
);

const lastNameInitial = (person) => person.lastName[0];

// stateless function component
export default (props) => (
+ <ListView
-   dataSource=...
+   items={props.people}
+   sortBy='lastName'
+   sectionBy={lastNameInitial}
    renderRow={renderRow}
    renderSectionHeader={renderSectionHeader}
  />
);
```

### Please note

This project is in a pre-release state. The API may be considered relatively stable, but changes may still occur.

[MIT licensed](LICENSE)
