const { seq, chars, lower, manhattan, stepper, numbers } = require('../common.js');


const matchIdx = (idx, find) => (i) => i[idx] === find;

const matchResult = (result, idx, list) => matchIdx(idx, result.length >= list.length / 2 ? '1' : '0')

const getOxygen = (list, find, idx = 0) => {

    const matchesFind = list.filter(matchIdx(idx, find));

    return (matchesFind.length == 1)
        ? matchesFind[0]
        : getOxygen(list.filter(matchResult(matchesFind, idx, list)), find, idx + 1);
}

const a = parseInt(getOxygen(i, '1'), 2);
const b = parseInt(getOxygen(i, '0'), 2);
console.log(a, b, a * b);


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