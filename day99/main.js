const { seq, gridLoop, extentArray, getClosest, makeGrid, formatGrid } = require('../common.js');

const transform = () => makeGrid(10, 10);

const part1 = (i) => {
    const size = extentArray(i);
    const getClose = getClosest(size, true);
    getClose(2, 2).forEach(({ y, x })=> i[y][x] = 1);
    console.log(i.map(line=>line.join('')).join('\n'));
    return 1;
}

const part2 = (i) => {
    const result = undefined;
    return result;
}

module.exports = {
    transform, part1, part2
}