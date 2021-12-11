const { seq, log, gridLoop, extentArray, numberGrid, getClosest, formatGrid, count } = require('../common.js');

const transform = numberGrid

const parser = (i) => {
    const map = [...i];
    const size = extentArray(map);
    const getClose = getClosest(size, true);
    const add = ({ x, y }) => {
        return ++map[y][x] == 10;
    }
    const get = ({ x, y }) => map[y][x];
    const set = ({ x, y }, value) => map[y][x] = value;

    let flashes = 0;

    const flash = (flashPos) => {
        set(flashPos, 0);
        flashes++;

        getClose(flashPos).forEach((p) => {
            if (get(p) > 0) {
                if (add(p)) {
                    flash(p);
                }
            }
        });

    }
    let stepNr = 0;

    const step = () => {
        stepNr++;
        gridLoop(size, (x, y) => add({ x, y }) ? { x, y } : -1, map).flat().map(flash);

        return { stepNr, flashes };
    }
    return { step, size, map };
}

const part1 = (i) => {

    const { step, map } = parser(i);
    const { flashes } = seq(100).map(step).last();

    printGrid(map);

    return flashes;
}

const printGrid = (map) => log(formatGrid(map, d=>d===0));

const part2 = (d) => {

    const { step, size: { size }, map } = parser(d);
    
    const countZeros = count(0);

    let flashStep = 0;
    let flashing = 0;

    while (flashing < size) {
        flashStep = step().stepNr;
        flashing = map.reduce((all, line) => all + countZeros(line), 0);
    }
    // printGrid(map);

    return 100 + flashStep;
}

module.exports = {
    transform, part1, part2, test: 0
}