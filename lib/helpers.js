// @flow

type Comparator = string | Function;
type Data = Object[];

function getBooleanComparator(sortBy) {
  if (typeof sortBy === 'string') {
    const parts = sortBy.split(' ');
    if (parts.length === 1) {
      return (a, b) => a[sortBy] < b[sortBy];
    }

    //eslint-disable-next-line no-magic-numbers
    if (parts.length === 2 && parts[1] === 'desc') {
      return (a, b) => a[parts[0]] > b[parts[0]];
    }

    throw new Error(`Unexpected sortBy value ${sortBy}`);
  }

  return sortBy;
}

function getComparator(sortBy) {
  const comparator = getBooleanComparator(sortBy);
  return (a, b) => {
    const result = comparator(a, b);
    if (typeof result === 'boolean') {
      return result ? 1 : -1;
    } else if (typeof result === 'number') {
      return result;
    } else {
      throw new Error(`Comparator returned an unexpected value ${result}`);
    }
  };
}

export function groupDataBy(groupBy: Comparator, data: Data): {} {
  const keyFn = typeof groupBy === 'string'
    ? (item) => item[groupBy]
    : groupBy;

  return data.reduce((grouped, item) => {
    const key = keyFn(item);
    return {
      ...grouped,
      [key]: (grouped[key] || []).concat(item)
    };
  }, {});
}

export function sortDataBy(sortBy: Comparator, data: Data): Data {
  const comparator = getComparator(sortBy);
  return data.sort(comparator);
}
