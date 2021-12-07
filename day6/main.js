const { seq, chars, lower, manhattan, stepper, numbers } = require('../common.js');

const convertSeed = (seed) => new Array(9).fill(0).map((_, i) => seed.filter(j => j === i).length);

const tick = (parts, curr = 0) => () => {
    parts[(curr + 7) % 9] += parts[curr++ % 9];
    return parts;
}

const f = tick(convertSeed(dataSeed));
let c = 0;
for (var j = 0; j < 256; j++) {
    c = f();
}
console.log('results', c.reduce((s, i) => s + i, 0));

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