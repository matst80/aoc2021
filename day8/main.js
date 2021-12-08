
const { add } = require('../common.js');


const parseSegment = (input) => {
    return input.split('').sort((a, b) => a.localeCompare(b)).join('');
}

const transform = (input) => input.split('\n').map(line => line.split('|').map(d => d.split(' ').map(d => d.trim()).filter(d => d && d != ' ')));//.map(parseSegment)


const countLengths = (lengths) => (sum, item) => {
    if (lengths.includes(item.length))
        return sum + 1;
    return sum;
}


const part1 = (i) => {



    const lenghtTofind = [2, 4, 3, 7];

    const r = i.map(([_, p2]) => p2).flat();

    const result = r.reduce(countLengths(lenghtTofind), 0);

    return result;
}

const getUnknown = (arr, known) => {
    const t = Object.values(known);    
    return arr.filter(d => !t.includes(d));
}

const findNumbers = (arr) => {
    
    let byLength = arr.reduce((sum, i) => {
        return { ...sum, [i.length]: [...sum[i.length] ?? [], i] }
    }, {});

    const known = {
        '1': byLength[2][0],
        '3': byLength[5].find(d => byLength[2][0].split('').every(i => d.includes(i))),
        '4': byLength[4][0],
        '7': byLength[3][0],
        '8': byLength[7][0],
    };

    let unknown = getUnknown(arr, known);

    const add = (nr, value) => {
        known[nr] = value;
        unknown = getUnknown(arr, known)
        byLength = unknown.reduce((sum, i) => {
            return { ...sum, [i.length]: [...sum[i.length] ?? [], i] }
        }, {});

    }
    add('9', byLength[6].find(d => {
        return known[7].split('').every(i => d.includes(i)) && known[4].split('').every(i => d.includes(i))
    }));


    add('0', byLength[6].find(d => {
        return known[7].split('').every(i => d.includes(i))
    }));

    add('6', byLength[6][0]);


    const f = known[8].split('').filter(d => !known['6'].includes(d));

    add('2', unknown.find(d => d.length == 5 && d.includes(f)));
    add('5', unknown[0]);


    return Object.entries(known).reduce((sum, [k, v]) => ({ ...sum, [parseSegment(v)]: k }), {});
}


const part2 = (i) => {
    const parseLine = ([test, toDisplay]) => {


        const numbers = findNumbers(test);

        return Number(toDisplay.map(j => {
            return numbers[parseSegment(j)];
        }).join(''));
    }
    return i.map(parseLine).reduce(add, 0);

}

module.exports = {
    transform, part1, part2
}