const fs = require("fs");

const numbers = (separator = ',') => (input) => input.split(separator).toNumber();

const stepper =
    (items, idx = 0) =>
        () =>
            items[idx++];

const add = (sum, i) => sum + i;

Array.prototype.toNumber = function () {
    return this.map((d) => d.trim()).filter((d) => d.length).map(Number);
}

Array.prototype.trim = function () {
    return this.map(d => d.trim()).filter(d => d && d.length);
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const lower = 'abcdefghijklmnopqrstuvwxyz'.split('');

const extent = (points) => {
    return points.reduce(({ top, left, width, height }, [x, y]) => {
        return {
            top: Math.min(top, y),
            left: Math.min(left, x),
            width: Math.max(width, x),
            height: Math.max(height, y)
        }
    }, { width: 0, height: 0, top: 9999999, left: 9999999 });
}

const extentArray = (lines) => ({ top: 0, left: 0, width: lines[0].length, height: lines.length });

const extentLines = (points) => {
    return points.reduce(({ top, left, width, height }, { x1, y1, x2, y2 }) => {
        return {
            top: Math.min(top, y1, y2),
            left: Math.min(left, x1, x2),
            width: Math.max(width, x1, x2),
            height: Math.max(height, y1, y2)
        }
    }, { width: 0, height: 0, top: 9999999, left: 9999999 });
}

const expand = ({ top, left, width, height }, size = 1) => ({
    top: top - size,
    left: left - size,
    width: width + size * 2,
    height: height + size * 2,
});

const gridLoop = ({ top = 0, left = 0, width, height }, cb, arr = []) => {
    const grid = [];
    for (y = top; y < height; y++) {
        const line = [];
        for (x = left; x < width; x++) {
            //const pos = (y * width) + x;
            line.push(cb(x, y, arr[y][x]));
        }
        //console.log(y);
        grid.push(line);
    }
    return grid;
}

const formatGrid = (grid, width, height) => {
    return gridLoop(width, height, (pos, x, y, v) => v, grid).map(l => l.join(' '));
};

const seq = (l) => new Array(l).fill(0).map((_, i) => i);

const makeGrid = (width, height, fill = 0) => {
    return new Array((height + 1) * width).fill(fill)
}

const manhattan = ([x0, y0], [x1, y1]) => Math.abs(x1 - x0) + Math.abs(y1 - y0);

const getResultAfter = (nr, fn) => {
    let c = 0;
    for (var j = 0; j < nr; j++) {
        c = fn();
    }
    return c;
}

const getClosest = ({ width, height, top, left }) => (x, y) => {
    const pos = [];
    if (x > top) pos.push({ x: x - 1, y });
    if (y > left) pos.push({ x, y: y - 1 });
    if (x < width - 1) pos.push({ x: x + 1, y });
    if (y < height - 1) pos.push({ x, y: y + 1 });
    return pos;
}

module.exports = {
    seq,
    getResultAfter,
    add,
    manhattan,
    stepper,
    numbers,
    chars,
    gridLoop,
    lower,
    makeGrid,
    extent,
    extentLines,
    extentArray,
    formatGrid,
    getClosest,
    expand
}