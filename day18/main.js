const { seq } = require('../common.js');

const transform = input => input.split('\n').trim();

const magnitude = (pair) => {
    const [a, b] = pair.map((n) => (Array.isArray(n) ? magnitude(n) : n));
    return 3 * a + 2 * b;
}

const depthCounter = (depth = 0, open = '[', close = ']') => {
    return [(chr) => {
        if (chr === open)
            depth++;
        else if (chr === close)
            depth--;
    }, () => depth];
}

const getDepth = (line, index) => {
    const [check, value] = depthCounter();
    seq(index, line).forEach(check);
    return value();
}

const splitLine = (line, index, len = 1) => [line.slice(0, index), line.slice(index + len)];


const singleDigit = new RegExp(/(\d+)/);

const explode = (line, match) => {
    const [complete, a, b] = match;

    const [l, r] = [a, b].map(to => (stringToAdd) => Number(stringToAdd) + Number(to));

    let [left, right] = splitLine(line, match.index, complete.length);

    return `${left.reverse().replace(singleDigit, l).reverse()}0${right.replace(singleDigit, r)}`;
}

const split = (line, match) => {
    let [left, right] = splitLine(line, match.index, match[0].length);

    const n = Number(match[0]);
    return `${left}[${Math.floor(n / 2)},${Math.ceil(n / 2)}]${right}`;
}

const reduce = (line) => {
    outer: while (true) {
        for (const match of line.matchAll(/\[(\d+),(\d+)]/g)) {
            const depth = getDepth(line, match.index);
            if (depth >= 4) {
                line = explode(line, match);
                continue outer;
            }
        }

        for (const match of line.matchAll(/\d\d+/g)) {
            line = split(line, match);
            continue outer;
        }
        break;
    }
    return line;
}

const reduceFn = (acc, line) => reduce(`[${acc},${line}]`);

const part1 = (data) => {
    return magnitude(JSON.parse(reduce(data.reduce(reduceFn))))
}

const part2 = (lines) => {
    let max = 0;
    for (let i = 0; i < lines.length - 1; i++) {
        for (let j = i + 1; j < lines.length; j++) {
            max = Math.max(
                max,
                magnitude(JSON.parse(reduceFn(lines[i],lines[j]))),
                magnitude(JSON.parse(reduceFn(lines[j],lines[i])))
            );
        }
    }

    return max;
}

module.exports = {
    transform, part1, part2, test: 0
}