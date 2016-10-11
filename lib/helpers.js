// @flow

type SortComparator = (a: any, b: any) => number | boolean;
type GroupComparator = (a: any) => string;

export function groupDataBy(groupBy: GroupComparator, data: any[]): {} {
  return data.reduce((grouped, item) => {
    const key = groupBy(item);
    return {
      ...grouped,
      [key]: (grouped[key] || []).concat(item)
    };
  }, {});
}

export function sortDataBy(sortBy: SortComparator, data: any[]): any[] {
  return data.sort((a, b) => {
    const result = sortBy(a, b);
    if (typeof result === 'boolean') {
      return result ? -1 : 1;
    } else if (typeof result === 'number') {
      return result;
    } else {
      throw new Error(`Comparator returned an unexpected value ${result}`);
    }
  });
}
