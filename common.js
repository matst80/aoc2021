const numbers = (separator = ',') => (input) => input.split(separator).toNumber();

const stepper =
    (items, idx = 0) =>
        () =>
            items[idx++];

const add = (sum, i) => sum + i;
const mul = (sum, i) => sum * i;
const sub = (sum, i) => sum - i;
Array.prototype.toNumber = function () {
    return this.map((d) => d.trim()).filter((d) => d.length).map(Number);
}

Array.prototype.trim = function () {
    return this.map(d => d.trim()).filter(d => d && d.length);
}

Array.prototype.last = function () {
    return this[this.length - 1];
}

Array.prototype.sum = function () {
    return this.reduce(add, 0);
}

const log = console.log;

const count = (nr) => (line) => line.reduce((sum, i) => sum + ((i === nr) ? 1 : 0), 0);

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const lower = 'abcdefghijklmnopqrstuvwxyz'.split('');

const extent = (points) => {
    const size = points.reduce(({ top, left, width, height }, { x, y }) => {
        return {
            top: Math.min(top, y + 1),
            left: Math.min(left, x),
            width: Math.max(width, x),
            height: Math.max(height, y + 1)
        }
    }, { width: 0, height: 0, top: 9999999, left: 9999999 });
    return { ...size, size: (size.height - size.top) * (size.width - size.left) };
}

const extentArray = (lines) => ({ top: 0, left: 0, width: lines[0].length, height: lines.length, size: lines.length * lines[0].length });

const extentLines = (points) => {
    const size = points.reduce(({ top, left, width, height }, { x1, y1, x2, y2 }) => {
        return {
            top: Math.min(top, y1, y2),
            left: Math.min(left, x1, x2),
            width: Math.max(width, x1 + 1, x2 + 1),
            height: Math.max(height, y1 + 1, y2 + 1)
        }
    }, { width: 0, height: 0, top: 9999999, left: 9999999 });
    return { ...size, size: (size.height - size.top) * (size.width - size.left) };
}

const expand = ({ top, left, width, height }, size = 1) => ({
    top: top - size,
    left: left - size,
    width: width + size * 2,
    height: height + size * 2,
});

const gridLoop = ({ top = 0, left = 0, width, height }, cb, arr) => {
    const grid = [];
    for (y = top; y < height; y++) {
        const line = [];
        for (x = left; x < width; x++) {
            const v = cb(x, y, (arr !== undefined) ? arr[y][x] : 0);
            if (v !== -1)
                line.push(v);
        }
        grid.push(line);
    }
    return grid;
}

addColorAndJoin = (mark) => (line) => {
    return line.map(d => mark && mark(d) ? `\x1b[42m${d}\x1b[0m` : d).join('')
}

const asNumbers = (a, b) => a - b;

const formatGrid = (grid, highlight) => grid.map(addColorAndJoin(highlight)).join('\n');

const seq = (l) => new Array(l).fill(0).map((_, i) => i);

//const count = (arr) => (value) => arr.reduce((sum, item) => item === value ? sum + 1 : sum, 0);

const makeGrid = (width, height, fill = 0) => {
    return seq(height).map(_ => seq(width).fill(fill));
}

const manhattan = ([x0, y0], [x1, y1]) => Math.abs(x1 - x0) + Math.abs(y1 - y0);

const getResultAfter = (nr, fn) => {
    let c = 0;
    for (var j = 0; j < nr; j++) {
        c = fn();
    }
    return c;
}

const byCost = (a, b) => a.cost - b.cost;

const aStar = (startPos, getPossibleSteps, isEnd, getCost) => {
    const walked = new Set();
    const toTry = [{ pos: startPos, cost: 0 }];
    while (toTry.length > 0) {
        const { pos, cost, path=[] } = toTry.shift();

        if (isEnd(pos)) {
            return {cost,path};
        }

        getPossibleSteps(pos)
            .forEach(({ idx, ...p }) => {
                if (!walked.has(idx)) {
                    walked.add(idx);
                    toTry.push({ pos: p, cost: cost + getCost(p), path:[...path,p] });
                }
            });

        toTry.sort(byCost);
    }
    
    return cost;
}

const getValueAtPosition = (data) => ({ x, y }) => data[y][x];

const getClosest = ({ width, height, top=0, left=0 }, diagonal = false) => ({ x, y }) => {
    const pos = [];
    const getIdx = (x, y) => y * width + x;
    if (x > left) pos.push({ x: x - 1, y });
    if (y > top) pos.push({ x, y: y - 1 });
    if (x < width - 1) pos.push({ x: x + 1, y });
    if (y < height - 1) pos.push({ x, y: y + 1 });
    if (diagonal) {
        if (x > left && y > top) pos.push({ x: x - 1, y: y - 1 });
        if (x < width - 1 && y > top) pos.push({ x: x + 1, y: y - 1 });

        if (y < height - 1 && x < width - 1) pos.push({ x: x + 1, y: y + 1 });
        if (y < height - 1 && x > left) pos.push({ x: x - 1, y: y + 1 });
    }
    return pos.map(d => ({ ...d, idx: getIdx(d.x, d.y) }));
}

const charGrid = a => a.split('\n').map(d => d.trim().split(''));

const numberGrid = a => a.split('\n').map(d => d.trim().split('').toNumber());

const byLength = (a, b) => a.length - b.length;

const tlog = (isTest) => (...args) => {
    if (isTest) {
        console.log(...args);
    }
}

const copyGridPart = (xo, yo, { width, height }, map) => {
    const tmpGrid = makeGrid(width, height);
    gridLoop({ width, height }, (x, y) => {
        tmpGrid[y][x] = map[yo + y][xo + x];
    });
    return tmpGrid;
}

module.exports = {
    charGrid,
    seq,
    numberGrid,
    copyGridPart,
    asNumbers: (a, b) => a - b,
    getResultAfter,
    add,
    manhattan,
    stepper,
    numbers,
    chars,
    tlog,
    log,
    aStar,
    gridLoop,
    lower,
    makeGrid,
    extent,
    getValueAtPosition,
    extentLines,
    extentArray,
    formatGrid,
    getClosest,
    expand,
    mul,
    count,
    asNumbers,
    byLength,
    sub
}