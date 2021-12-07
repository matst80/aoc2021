const { seq } = require('../common.js');

const transform = (input) =>
    input.split('\n').map(s => {
        const [dir, amount] = s.split(' ');
        return { dir, nr: Number(amount) };
    });


const part1 = (i) => {
    const pos = i.reduce((acc, { dir, nr }) => {
        if (dir === 'up') {
            return { ...acc, y: acc.y - nr };
        }
        if (dir === 'down') {
            return { ...acc, y: acc.y + nr };
        }
        if (dir === 'forward') {
            return { ...acc, x: acc.x + nr };
        }
        return acc;
    }, { x: 0, y: 0 });
    return pos.x * pos.y;
}

const part2 = (i) => {
    const pos = i.reduce((acc, { dir, nr }) => {
        if (dir === 'up') {
            return { ...acc, aim: acc.aim - nr };
        }
        if (dir === 'down') {
            return { ...acc, aim: acc.aim + nr };
        }
        if (dir === 'forward') {
            return { ...acc, y: acc.y + (nr * acc.aim), x: acc.x + nr };
        }

        return acc;
    }, { x: 0, y: 0, aim: 0 })
    return pos.x * pos.y;
}

module.exports = {
    transform,
    part1,
    part2
}