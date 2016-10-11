// @flow

type GroupComparator = (a: any) => string;

export default function groupDataBy(groupBy: GroupComparator, data: any[]): {} {
  return data.reduce((grouped, item) => {
    const key = groupBy(item);
    return {
      ...grouped,
      [key]: (grouped[key] || []).concat(item)
    };
  }, {});
}
