import React, { PropTypes, Component } from 'react';
import { ListView } from 'react-native';
import { groupDataBy, sortDataBy } from './helpers';

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
    const data = sortBy ? sortDataBy(sortBy, items) : items;
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
  items: PropTypes.array.isRequired,
  rowHasChanged: PropTypes.func,
  sectionBy: PropTypes.func,
  sectionHeaderHasChanged: PropTypes.func,
  sortBy: PropTypes.func
};

ControlledListView.defaultProps = {
  rowHasChanged: (a, b) => a !== b,
  sectionHeaderHasChanged: (a, b) => a !== b,
  dataSourceShouldUpdate: (prevProps, nextProps) => (
    prevProps.items !== nextProps.items ||
    prevProps.sortBy !== nextProps.sortBy ||
    prevProps.sectionBy !== nextProps.sectionBy
  )
};

export default ControlledListView;
