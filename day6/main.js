const { seq, chars, lower, manhattan, stepper, numbers, getResultAfter, add } = require('../common.js');

const convertSeed = (seed) => seq(9).map((i) => seed.filter(j => j === i).length);

const tick = (parts, curr = 0) => () => {
    parts[(curr + 7) % 9] += parts[curr++ % 9];
    return parts;
}

const transform = numbers(',');

const part1 = (i) => {

    return getResultAfter(80, tick(convertSeed(i))).reduce(add, 0);

}

const part2 = (i) => {
    const f = tick(convertSeed(i));
    let c = 0;
    for (var j = 0; j < 256; j++) {
        c = f();
    }
    return c.reduce((s, i) => s + i, 0);
}

module.exports = {
    transform, part1, part2
}