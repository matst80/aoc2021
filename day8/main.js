
const { add } = require('../common.js');

const parseSegment = (input) =>
    input.split('').sort((a, b) => a.localeCompare(b)).join('');

const countLengths = (lengths) => (sum, item) =>
    sum + (lengths.includes(item.length) ? 1 : 0);

const getUnknown = (arr, known) => {
    const t = Object.values(known);
    return arr.filter(d => !t.includes(d));
}

const groupByLengths = (arr) => arr.reduce((sum, i) => {
    return { ...sum, [i.length]: [...sum[i.length] ?? [], i] }
}, {});

const hasAll = (...match) => (str) => str.split('').every(i => {
    return match.every(k => k.split('').every(j => {
        return str.includes(j);
    }));
});

const findNumbers = (arr) => {

    let byLength = groupByLengths(arr);
    const known = {
        '1': byLength[2][0],
        '4': byLength[4][0],
        '7': byLength[3][0],
        '8': byLength[7][0],
    };
    let unknown = getUnknown(arr, known);

    const add = (nr, value) => {
        known[nr] = value;
        unknown = getUnknown(arr, known)
        byLength = groupByLengths(unknown);
    }

    add('3', byLength[5].find(hasAll(known[1])));
    add('9', byLength[6].find(hasAll(known[7], known[4])));
    add('0', byLength[6].find(hasAll(known[7])));
    add('6', byLength[6][0]);

    const f = known[8].split('').filter(d => !known['6'].includes(d));

    add('2', byLength[5].find(d => d.includes(f)));
    add('5', unknown[0]); // woho final

    return Object.entries(known).reduce((sum, [k, v]) => ({ ...sum, [parseSegment(v)]: k }), {});
}

const parseLine = ([test, toDisplay]) => {
    const numbers = findNumbers(test);
    return Number(toDisplay.map(j => numbers[parseSegment(j)]).join(''));
}

const transform = (input) => input.split('\n').map(line => line.split('|').map(d => d.split(' ').trim()));

const part1 = (i) => i.map(([_, p2]) => p2).flat().reduce(countLengths([2, 4, 3, 7]), 0);

const part2 = (i) => i.map(parseLine).reduce(add, 0);

module.exports = {
    transform, part1, part2
}