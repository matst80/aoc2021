const { seq, chars, lower, manhattan, stepper, numbers, add } = require('../common.js');

const transform = input => {
    const lines = input.split('\n').map(d => d.trim().split('').toNumber());
    return { width: lines[0].length, data: lines };
}

const getClose = (pos, all, width) => [
    pos - width,
    pos - 1,
    pos + 1,
    pos + width
]
    .map(d => (d >= 0 && d < all.length) ? all[d] : -1)
    .filter(d => d !== -1);

const getLowPoints = (i, width) => i.reduce((arr, value, idx, all) =>
    getClose(idx, all, width).every(a => a > value) ? [...arr, { value, idx }] : arr
    , []);

const excludeNr = 9;

const toXY = (width) => d => ({ x: d.idx % width, y: Math.floor(d.idx / width) })

const part1 = ({ width, data }) => {
    return getLowPoints(data.flat(), width).map(d => d.value + 1).reduce(add, 0);
}

const part2 = ({ width, data }) => {
    let map = [...data], height = data.length;

    const lowPoints = getLowPoints(data.flat(), width).map(toXY(width));

    const walk = (x, y) => {
        if (map[y][x] < excludeNr)
            currentSize++;
        else
            return;
        map[y][x] = excludeNr;
        if (x > 0) walk(x - 1, y);
        if (y > 0) walk(x, y - 1);
        if (x < width - 1) walk(x + 1, y);
        if (y < height - 1) walk(x, y + 1);
    }

    let basins = [], currentSize = 0;
    lowPoints.map(({ x, y }) => {
        currentSize = 0;
        walk(x, y);
        basins.push(currentSize);
    })

    const [a, b, c] = basins.sort((a, b) => b - a);

    return a * b * c;
}

module.exports = {
    transform, part1, part2, test: 0
}