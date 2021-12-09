const { add, gridLoop, extentArray, getClosest } = require('../common.js');

const transform = input => input.split('\n').map(d => d.trim().split('').toNumber());

const excludeNr = 9;

const getValue = (data) => ({ x, y }) => data[y][x];

const getLow = (data) => {
    const size = extentArray(data);
    const getClose = getClosest(size);
    return gridLoop(size, (x, y, value) => {
        const close = getClose(x, y).map(getValue(data)).every(a => a > value);
        return close ? { x, y, value } : -1;
    }, data).flat();
}

const part1 = (data) => {
    return getLow(data).map(d => d.value + 1).reduce(add, 0);
}

const part2 = (map) => {

    const size = extentArray(map);
    const getClose = getClosest(size);

    const walk = (x, y) => {
        if (map[y][x] < excludeNr) {
            currentSize++;
            map[y][x] = excludeNr
            getClose(x, y).forEach(i => walk(i.x, i.y));
        }
    }

    let basins = [], currentSize = 0;
    getLow(map).map(({ x, y }) => {
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