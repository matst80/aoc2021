const { seq, manhattan, stepper, numbers, add } = require('../common.js');

//const lower = ' abcdefg';

const mul = (sum, i) => sum * i;

const parseSegment = (input) => {
    return input.split('').sort().join('');
}


const segments = [ // 1 4 7 8
    'abcefg', // 0
    'cg', // 1
    'acdeg', // 2
    'acdfg', // 3
    'bcdf', // 4
    'abdfg', // 5
    'abdfge', // 6
    'acf', // 7
    'abcdefg', // 8
    'abcdfg', // 9
].map(parseSegment);

//console.log(segments);

const transform = (input) => input.split('\n').map(line => line.split('|').map(d => d.split(' ').map(d=>d.trim()).filter(d => d && d != ' ')));//.map(parseSegment)

const count = (valuesToFind, cnt) => ([p1, p2]) => {
    //console.log(p2,valuesToFind);
    return p1.filter(d => valuesToFind.includes(parseSegment(d)));
}

const countUnique = (sum, item) => {
    if (!sum.found.includes(item)) {
        return { count: sum.count + 1, found: [...sum.found, item] }
    }
    return sum;
}

const countUniqueLen = (sum, item) => {
    if (!sum.found.includes(item.length)) {
        return { count: sum.count + 1, found: [...sum.found, item.length] }
    }
    return sum;
}

const part1 = (i) => {
    const find = [segments[1], segments[4], segments[7], segments[8]]
    const match = count(find);
    const r = i.map(match).flat();
    //const r = i.map(([_, p2]) => p2).flat();  
    const result = r.reduce(countUnique, { count: 0, found: [] });
    console.log(result);
    return result.count;
}

const part2 = (i) => {
    const result = undefined;
    return result;
}

module.exports = {
    transform, part1, part2
}