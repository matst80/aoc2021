const { seq, log, makeGrid, gridLoop, extentArray, numbers, numberGrid, charGrid, extent } = require('../common.js');

let hasSplitted = false;

const transform = (input) => {
    const lines = input.split('\n');
    const coors = [];
    const folds = [];
    lines.forEach((d) => {
        
        if (d.length < 2) {
            hasSplitted = true;
            return;
        }
        if (!hasSplitted) {
            const [x, y] = d.split(',').toNumber();
            coors.push({ x, y });
        }
        else {
            const [_, direction, nr] = d.match(/ (.)=(\d+)/);
            folds.push({direction,nr:Number(nr)});
        }
    });
    return { coors, folds, size:extent(coors) };
}

const part1 = ({coors, folds, size}) => {
    const grid = makeGrid(size);
    console.log(coors);
    const draw = ({x,y}) => grid[y][x] = 1;
    coors.forEach(draw);
    const result = i;
    return result;
}

const part2 = ({coors, folds, size}) => {
    const result = undefined;
    return result;
}

module.exports = {
    transform, part1, part2, test: 1
}