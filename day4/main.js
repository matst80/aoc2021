const { seq, chars, lower, manhattan, stepper, numbers } = require('../common.js');

const { read, add, stepper } = require("./common");

const parseBoards = (acc, line, idx) => {
  if (idx === 0)
    return {
      ...acc,
      drawn: line.split(",").toNumber(),
    };
  else if (line.length > 1) {
    return {
      ...acc,
      tmp: [...acc.tmp, line.split(" ").toNumber()],
    };
  } else if (acc.tmp.length > 0) {
    return { ...acc, boards: [...acc.boards, acc.tmp], tmp: [] };
  }
  return acc;
};

const data = read("day4.txt", "\n").reduce(parseBoards, {
  tmp: [],
  boards: [],
});

const getRows = (lines) =>
  lines[0].map((_, idx) => lines.map((line) => line[idx]));

const matchItems = (drawn) => (line) => line.every((nr) => drawn.includes(nr));

const checkRows = (drawn) => (lines) =>
  lines.some(matchItems(drawn)) || getRows(lines).some(matchItems(drawn));

const flattenAndRemove = (drawn) => (result, line) =>
  [...result, ...line.filter((d) => !drawn.includes(d))];

const wonThisRound = (hasWon) => (d) => !hasWon.includes(d);

const checkWinners = (numbers, requiredWinners = 1) => {
  const next = stepper(numbers);
  const checkBoards = (drawn, hasWon = []) => {
    const winners = data.boards.filter(checkRows(drawn));

    return winners.length === requiredWinners
      ? winners
          .find(wonThisRound(hasWon))
          .reduce(flattenAndRemove(drawn), [])
          .reduce(add, 0) * drawn[drawn.length - 1]
      : checkBoards([...drawn, next()], winners);
  };

  return checkBoards([next()]);
};

console.log(checkWinners(data.drawn, data.boards.length));



const transform = numbers(',');

const part1 = (i) => {
    const result = i;
    return result;
}

const part2 = (i) => {
    const result = undefined;
    return result;
}

module.exports = {
    transform, part1, part2
}