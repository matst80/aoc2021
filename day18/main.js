const { seq } = require('../common.js');

const transform = input => input.split('\n').trim();

const magnitude = (pair) => {
    const [a, b] = pair.map((n) => (Array.isArray(n) ? magnitude(n) : n));
    return 3 * a + 2 * b;
}

const depthCounter = (depth = 0, open = '[', close = ']') => {
    return (chr) => {
        if (chr === undefined)
            return depth;
        if (chr === open)
            depth++;
        else if (chr === close)
            depth--;
        return depth;
    };
}

const splitLine = (line, index, len = 0) => [line.substr(0, index), line.substr(index + len)];

const singleDigit = new RegExp(/(\d+)/);
const doubleDigits = new RegExp(/\d\d+/g);
const twoNumbers = new RegExp(/\[(\d+),(\d+)]/g);

const explode = (line, match) => {
    const [{ length }, a, b] = match;

    const [l, r] = [a, b].map(to => toAdd => Number(toAdd) + Number(to));

    let [left, right] = splitLine(line, match.index, length);

    const p1 = left.reverse().replace(singleDigit, l).reverse();
    const p2 = right.replace(singleDigit, r);

    return `${p1}0${p2}`;
}

const split = (line, match) => {
    let [left, right] = splitLine(line, match.index, 2);

    const n = Number(match[0]) / 2;
    return `${left}[${Math.floor(n)},${Math.ceil(n)}]${right}`;
}

const reduce = (line) => {
    loop:
    while (true) {
        for (const match of line.matchAll(twoNumbers)) {
            if (seq(match.index, line).map(depthCounter()).last() >= 4) {
                line = explode(line, match);
                continue loop;
            }
        }

        for (const match of line.matchAll(doubleDigits)) {
            line = split(line, match);
            continue loop;
        }
        break;
    }

    return line;
}

const reduceFn = (acc, line) => reduce(`[${acc},${line}]`);

const magParse = (data) => magnitude(JSON.parse(data));

const part1 = (data) => {
    return magParse(reduce(data.reduce(reduceFn)));
}

const part2 = (lines) => {
    let max = 0;
    for (let i = 0; i < lines.length - 1; i++) {
        for (let j = i + 1; j < lines.length; j++) {
            max = Math.max(
                max,
                magParse(reduceFn(lines[i], lines[j])),
                magParse(reduceFn(lines[j], lines[i]))
            );
        }
    }

    return max;
}

module.exports = {
    transform, part1, part2, test: 0
}