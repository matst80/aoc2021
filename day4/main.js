const { seq, stepper, numbers, add } = require('../common.js');

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

const getRows = (lines) =>
  lines[0].map((_, idx) => lines.map((line) => line[idx]));

const matchItems = (drawn) => (line) => line.every((nr) => drawn.includes(nr));

const checkRows = (drawn) => (lines) =>
  lines.some(matchItems(drawn)) || getRows(lines).some(matchItems(drawn));

const flattenAndRemove = (drawn) => (result, line) =>
  [...result, ...line.filter((d) => !drawn.includes(d))];

const wonThisRound = (hasWon) => (d) => !hasWon.includes(d);

const checkWinners = (data, numbers, requiredWinners = 1) => {
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

const transform = (input) => input.split('\n').reduce(parseBoards, {
  tmp: [],
  boards: [],
})

const part1 = (data) => {
  return checkWinners(data, data.drawn, 1);
}

const part2 = (data) => {
  return checkWinners(data, data.drawn, data.boards.length);
}

module.exports = {
  transform, part1, part2
}