const {
  seq
} = require("../common.js");

const matchIdx = (idx, find) => (i) => i[idx] === find;

const matchResult = (result, idx, list) =>
  matchIdx(idx, result.length >= list.length / 2 ? "1" : "0");

const getOxygen = (list, find, idx = 0) => {
  const matchesFind = list.filter(matchIdx(idx, find));

  return matchesFind.length == 1
    ? matchesFind[0]
    : getOxygen(
        list.filter(matchResult(matchesFind, idx, list)),
        find,
        idx + 1
      );
};

const most = (i, find) => {
  const th = i.length / 2;
  return (idx) => (i.filter(matchIdx(idx, find)).length > th ? "1" : "0");
};

const transform = (input) => input.split("\n");

const part1 = (i) => {
  const bitLength = i[0].length;
  const a = seq(bitLength).map(most(i, "1")).join("");
  const b = seq(bitLength).map(most(i, "0")).join("");

  return parseInt(a, 2) * parseInt(b, 2);
};

const part2 = (i) => {
  const a = parseInt(getOxygen(i, "1"), 2);
  const b = parseInt(getOxygen(i, "0"), 2);

  return a * b;
};

module.exports = {
  transform,
  part1,
  part2,
};
