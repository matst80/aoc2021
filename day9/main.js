const { add, gridLoop, extentArray, getClosest, getValueAtPosition, asNumbers } = require('../common.js');

const transform = input => input.split('\n').map(d => d.trim().split('').toNumber());

const excludeNr = 9;

const getLow = (data) => {
    const size = extentArray(data);
    const getClose = getClosest(size);
    const get = getValueAtPosition(data);
    return gridLoop(size, (x, y, value) => {
        const close = getClose({x, y}).map(get).every(a => a > value);
        return close ? { x, y, value } : -1;
    }, data).flat();
}

const part1 = (data) => getLow(data)
    .map(d => d.value + 1)
    .reduce(add, 0);

const part2 = (map) => {
    const getClose = getClosest(extentArray(map));
    const get = ({x,y}) => map[y][x];
    const exclude = ({x,y}) => map[y][x] = excludeNr;

    const walk = (p) => {
        if (get(p) < excludeNr) {
            currentSize++;
            exclude(p);
            getClose(p).forEach(walk);
        }
    }

    let currentSize = 0;
    const basins = getLow(map).map((p) => {
        currentSize = 0;
        walk(p);
        return currentSize;
    })

    const [a, b, c] = basins.sort(asNumbers).reverse();

    return a * b * c;
}

module.exports = {
    transform, part1, part2, test: 0
}