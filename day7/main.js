const { seq, chars, lower, manhattan, stepper, numbers } = require('../common.js');

const addAll = (shouldAdd, t) => shouldAdd ? (t * (t + 1)) / 2 : t;
const costTo = (data, shouldAdd = false) => (destination) =>
    data.reduce((sum, to) => sum + addAll(shouldAdd, Math.abs(to - destination)), 0);

const maxPos = (data) => data.reduce((max, i) => Math.max(max, i), 0);
const result = (toTry, cost) => toTry
    .map((nr) => ({ nr, cost: cost(nr) }))
    .sort((a, b) => a.cost - b.cost);



const transform = numbers();

const part1 = (i) => {
    return result(i, costTo(i))[0].cost;
}

const part2 = (i) => {
    const numbersToTry = seq(maxPos(i));
    return result(numbersToTry, costTo(i, true))[0].cost;
}

module.exports = {
    transform, part1, part2
}