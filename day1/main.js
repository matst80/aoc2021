const { seq, numbers } = require('../common.js');

const countAdds = (all) => all.reduce(({ l, a }, j) => {
    if (l && l < j) {
        return { l: j, a: a + 1 };
    }
    return { l: j, a };
}, { a: 0 });

const getSum = (i) => (_, s) => i[s] + (i[s + 1] || 0) + (i[s + 2] || 0);

const transform = numbers('\n');

const part1 = (i) => {
    return countAdds(i).a;
}

const part2 = (i) => {
    const i2 = i.map(getSum(i));
    return countAdds(i2).a;
}

module.exports = {
    transform,
    part1,
    part2
}