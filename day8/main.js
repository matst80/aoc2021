const { seq, manhattan, stepper, numbers, add } = require('../common.js');

//const lower = ' abcdefg';

const mul = (sum, i) => sum * i;

const parseSegment = (input) => {
    return input.split('').sort((a, b) => a.localeCompare(b)).join('');
}


const segments = [
    'abcefg',
    'cg',
    'acdeg',
    'acdfg',
    'bcdfg',
    'abdfg',
    'abdfge',
    'acf',
    'abcdefg',
    'abcdfg',
].map(parseSegment);

console.log(segments);

const transform = (input) => input.split('\n').map(line => line.split('|').map(d => d.split(' ').filter(d => d && d != ' ').map(parseSegment)));

const count = (valuesToFind, cnt) => ([p1, p2]) => {
    //console.log(p2,valuesToFind);
    return p1.filter(d => valuesToFind.includes(d));
}

const countUnique = (sum, item) => {
    if (!sum.found.includes(item)) {
        return { count: sum.count + 1, found: [...sum.found, item] }
    }
    return sum;
}

const countLengths = (lengths) => (sum, item) => {
    if (lengths.includes(item.length))
        return sum + 1;
    return sum;
}

const part1 = (i) => {

    const find = [segments[1], segments[4], segments[7], segments[8]];
    
    const match = count(find);
    //const r = i.map(match).flat();

    const r = i.map(([_, p2]) => p2).flat();
    
    const result = r.reduce(countLengths(find.map(k => k.length)), 0);
    console.log(result);
    return result;
}

const part2 = (i) => {
    const result = undefined;
    return result;
}

module.exports = {
    transform, part1, part2
}