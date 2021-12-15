const {
    log,
    makeGrid,
    gridLoop,
    extentArray,
    numberGrid,
    getClosest,
    copyGridPart,
    aStar,
    formatGrid,
} = require("../common.js");

const transform = numberGrid;

const shortestPath = (map, startPos = { x: 0, y: 0, idx: 0 }) => {
    const { width, height } = extentArray(map);

    const isEndPos = ({ x, y }) => (y === height - 1 && x === width - 1);
    const getCost = ({ x, y }) => map[y][x];

    const closest = getClosest({ width, height });

    return aStar(startPos, closest, isEndPos, getCost);
};

const part1 = (map) => {
    return shortestPath(map);
};

const expandMap = (baseMap, times = 5) => {
    const { width, height } = extentArray(baseMap);
    const totalMap = makeGrid(width * times, height * times);
    const totalSize = extentArray(totalMap);

    const getMod = (x, y) => baseMap[y % height][x % height];
    const set = (x, y, value) => totalMap[y][x] = value;

    const getTileAdd = (x, y) => {
        return Math.trunc(x / width) + Math.trunc(y / height);
    };

    const get = (x, y) => {
        return 1 + ((getMod(x, y) - 1 + getTileAdd(x, y)) % 9);
    };

    gridLoop(totalSize, (x, y) => {
        set(x, y, get(x, y));
    });

    // const logPart = (tileX, tileY) => {
    //     console.log(formatGrid(copyGridPart(width * tileX, height * tileY, {width,height}, totalMap)));
    // }
    // logPart(0, 0);
    // console.log('----');
    // logPart(1, 1);

    return totalMap;
};

const part2 = (map) => {
    return shortestPath(expandMap(map, 5));
};

module.exports = {
    transform,
    part1,
    part2,
    test: 0,
};
