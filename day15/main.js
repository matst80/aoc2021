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
    manhattan,
} = require("../common.js");

const transform = numberGrid;

const byCost = (a, b) => b.cost - a.cost;

const shortestPath = (map, startPos, isTest) => {
    const { width, height } = extentArray(map);

    const isEnd = ({ x, y }) => (y === height - 1 && x === width - 1);
    const getCost = ({ x, y }, prev) => map[y][x] + prev;

    const getPossibleSteps = getClosest({ width, height });
    //const closeSorted = (pos) => close(pos);

    const { cost, path } = aStar({ startPos, getPossibleSteps, isEnd, getCost, sort: byCost });

    if (isTest) {
        console.log(formatGrid(map, (_, d) => path.some(e => e.x === d.x && e.y === d.y)));
    }

    return cost;
};

const part1 = (map, isTest) => {
    return shortestPath(map, { x: 0, y: 0, idx: 0 }, isTest);
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

const part2 = (map, isTest) => {
    return shortestPath(expandMap(map, 5), { x: 0, y: 0, idx: 0 }, isTest);
};

module.exports = {
    transform,
    part1,
    part2,
    test: 0,
};
