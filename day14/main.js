const { add, seq, asNumbers } = require("../common.js");

const transform = (input) => {
  const [start, _, ...rules] = input.split("\n");

  return {
    template: start.split(""),
    rules: new Map(rules.map((d) => d.split(" -> "))),
  };
};

const getPairs = (template) =>
  template.reduce(
    (map, v, i, arr) =>
      i + 1 < arr.length
        ? map.set(v + arr[i + 1], (map.get(v + arr[i + 1]) || 0) + 1)
        : map,
    new Map()
  );

const getElements = (template) =>
  template.reduce((all, v) => all.set(v, (all.get(v) || 0) + 1), new Map());

const solve = ({ template, rules }, steps = 10) => {
  let [elms, pairs] = [getElements(template), getPairs(template)];

  const reactPossible = (count) => (map, pos) =>
    map.set(pos, (map.get(pos) || 0) + count);

  const updatePairs = (all, { pair: [a, b], count, chr }) => {
    elms.set(chr, (elms.get(chr) || 0) + count);
    return [a + chr, chr + b].reduce(reactPossible(count), all);
  };

  const transform = () =>
    [...pairs.entries()].map(([pair, count]) => ({
      pair,
      count,
      chr: rules.get(pair),
    }));

  while (steps--) {
    pairs = transform().reduce(updatePairs, new Map());
  }

  const sorted = [...elms.values()].sort(asNumbers);
  return sorted.last() - sorted[0];
};

const part1 = (input) => {
  return solve(input, 10);
};

const part2 = (input) => {
  return solve(input, 40);
};

module.exports = {
  transform,
  part1,
  part2,
  test: 0,
};
