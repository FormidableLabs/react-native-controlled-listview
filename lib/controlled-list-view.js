import React, { PropTypes, Component } from 'react';
import { ListView } from 'react-native';
import is from 'immutable-is';

import { groupDataBy } from './group-data-by';
import { sortDataBy } from './sort-data-by';

const isImmutableList = (items) => items && typeof items.toArray === 'function';
const arrayOrImmutableListPropTypeValidator = (props, propName, componentName) => {
  const items = props[propName];
  return (!Array.isArray(items) || !isImmutableList(items))
    ? new Error(`Invalid prop ${propName} passed to ${componentName}.` +
      'Expected Array or Immutable.List')
    : undefined;
};

class ControlledListView extends Component {

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: props.rowHasChanged,
      sectionHeaderHasChanged: props.sectionHeaderHasChanged
    });

    this.state = {
      dataSource: this.updateDataSource(dataSource, props)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSourceShouldUpdate(this.props, nextProps)) {
      this.setState({
        dataSource: this.updateDataSource(this.state.dataSource, nextProps)
      });
    }
  }

  updateDataSource(dataSource, { items, sortBy, sectionBy }) {
    let data = isImmutableList(items) ? items.toArray() : items;
    if (sortBy) {
      data = sortDataBy(sortBy, data);
    }
    if (sectionBy) {
      const grouped = groupDataBy(sectionBy, data);
      return dataSource.cloneWithRowsAndSections(grouped);
    } else {
      return dataSource.cloneWithRows(data);
    }
  }

  render() {
    //eslint-disable-next-line no-unused-vars
    const { items, sortBy, sectionBy, ...listViewProps } = this.props;
    const { dataSource } = this.state;
    return (
      <ListView {...listViewProps} dataSource={dataSource} />
    );
  }
}

ControlledListView.propTypes = {
  dataSourceShouldUpdate: PropTypes.func,
  items: arrayOrImmutableListPropTypeValidator,
  rowHasChanged: PropTypes.func,
  sectionBy: PropTypes.func,
  sectionHeaderHasChanged: PropTypes.func,
  sortBy: PropTypes.func
};

ControlledListView.defaultProps = {
  rowHasChanged: (a, b) => !is(a, b),
  sectionHeaderHasChanged: (a, b) => a !== b,
  dataSourceShouldUpdate: (prevProps, nextProps) => !is(prevProps.items, nextProps.items)
};

export default ControlledListView;
