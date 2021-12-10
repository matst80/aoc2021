const { seq, chars, lower, manhattan, stepper, numbers } = require('../common.js');

const transform = (data) => data.split('\r\n').map(line => line.trim().split(''));

const parts = [
    ['(', ')'],
    ['[', ']'],
    ['{', '}'],
    ['<', '>'],
]

const hasStartChar = (chr) => parts.some(([s])=>s===chr);

const isEndChar = (start) => parts.find(([s])=>s==start)[1];

const removeIncorrect = (line) => {
    const len = line.length;
    const last = line[len-1];
    if (hasStartChar(last))
    {
        console.log('incomplete',line.join(''));
        return false;
    }

    let pos = 0,
        walked = [];
        started = [];

    const walk = () => {
        if (pos<len) {
            const char = line[pos++];
            if (hasStartChar(char)) {
                started.push(char);
                walked.push(char);
                walk();
            }
            else if (isEndChar(started[started.length-1])) {
                //console.log('found closing',started[started.length-1], char);
                walked.push(char);
                started.pop();
                walk();
            }
            
        }
        console.log(pos,len,walked.join(''), started.join(''));
    }
    walk();
    return pos===len;
    // console.log(pos, len);

    // const pairs = parts.some(([s, e]) => {
    //     return (line[0]===s) && (line[line.length-1]===e);
    // });
    // console.log('pairs',pairs);
    // return pairs;//.some(a=>a);
}

const part1 = (i) => {
    const clean = i.filter(removeIncorrect);
    //console.log(clean);
    return 1;
}

const part2 = (i) => {
    const result = undefined;
    return result;
}

module.exports = {
    transform, part1, part2, test:1
}