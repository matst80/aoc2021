const { seq, chars, lower, extent, manhattan, stepper, numbers } = require('../common.js');

const getStepAndLength = ({ x1, y1, x2, y2 }) => {
    const length = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    const xs = x2 == x1 ? 0 : x2 > x1 ? 1 : -1;
    const ys = y2 == y1 ? 0 : y2 > y1 ? 1 : -1;
    return { length, xs, ys };
};

const splitToCoords = (line) => {
    const [_, x1, y1, x2, y2] = line
        .match(/([0-9]+)\,([0-9]+) -> ([0-9]+)\,([0-9]+)/)
        .toNumber();

    const coords = { x1, y1, x2, y2, };

    return { ...coords, ...getStepAndLength(coords) };
};

const data = read("day5.txt").map(splitToCoords);


const { width, height } = extent(data);
const grid = new Array(width * height + width).fill(0);

const draw = (drawDiagonal) => ({ x1, y1, xs, ys, length }) => {
    if (drawDiagonal || (xs == 0 || ys == 0))
        for (var step = 0; step <= length; step++) {
            const x = step * xs + x1;
            const y = step * ys + y1;

            grid[y * extent.width + x] += 1;
        }
};

data.forEach(draw(true));

const countMultiples = (sum, i) => (i > 1) ? sum + 1 : sum;

console.log("sum", grid.reduce(countMultiples, 0));

const printGrid = (grid) => {
    for (y = 0; y <= height; y++) {
        let line = [];
        for (x = 0; x < width; x++) {
            line.push(grid[y * width + x]);
        }
        console.log(line.join(" "));
    }
};



const transform = numbers(',');

const part1 = (i) => {
    const result = i;
    return result;
}

const part2 = (i) => {
    const result = undefined;
    return result;
}

module.exports = {
    transform, part1, part2
}