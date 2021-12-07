const { seq, chars, lower, manhattan, stepper, numbers } = require('../common.js');

const seq = (len) => new Array(len).fill(0).map((_, i) => i);
const addAll = (t) => (t * (t + 1)) / 2;
const costTo = (destination) =>
  test.reduce((sum, to) => sum + addAll(Math.abs(to - destination)), 0);

const maxPos = test.reduce((max, i) => Math.max(max, i), 0);
const result = seq(maxPos)
  .map((nr) => ({ nr, cost: costTo(nr) }))
  .sort((a, b) => a.cost - b.cost);

console.log(result[0]);

const transform = (input) => {
    return input.split(',').toNumber();
}

const part1 = (i) => {
    const result = i;
    return result;
}

const part2 = (i) => {
    const result = i;//ddsss
    return result;
}

module.exports = {
    transform, part1, part2, test:true
}