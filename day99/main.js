const { seq, gridLoop, extentArray, getClosest, makeGrid, formatGrid, count } = require('../common.js');

const transform = () => makeGrid(5, 5);



const part1 = (i) => {
    const size = extentArray(i);
    const getClose = getClosest(size, true);
    const setValue = (value) => ({ x, y }) => i[y][x] = value;
    getClose(2, 2).forEach(setValue(1));
    console.log(formatGrid(i));
    const cnt = count(i.flat());
    return cnt(1);
}

const part2 = (i) => {
    const result = undefined;
    return result;
}

module.exports = {
    transform, part1, part2
}