const { numbers } = require('../common.js');

const countAdds = (all) => all.reduce((sum, j, idx, list) =>
    (idx > 0 && list[idx - 1] < j) ? sum + 1 : sum
    , 0);

const getSum = (i) => (_, s) => i[s] + (i[s + 1] || 0) + (i[s + 2] || 0);

const transform = numbers('\n');

const part1 = (i) => {
    return countAdds(i);
}

const part2 = (i) => {
    return countAdds(i.map(getSum(i)));
}

module.exports = {
    transform,
    part1,
    part2
}