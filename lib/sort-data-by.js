// @flow

type SortComparator = (a: any, b: any) => number | boolean;

export default function sortDataBy(sortBy: SortComparator, data: any[]): any[] {
  return data.slice(0).sort((a, b) => {
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
