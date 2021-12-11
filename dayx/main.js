const {
    seq,
    numbers,
} = require("../common.js");

const transform = numbers(" ");

const part1 = (i) => {
    let pos = 0;
    const get = () => i[pos++];

    const walk = () => {
        const [childNodes, metadata] = [get(), get()];
        let value = 0;

        seq(childNodes).forEach(() => value += walk());
        seq(metadata).forEach(() => value += get());

        return value;
    };

    const v = walk();

    return v;
};

const over = (limit) => (nr) => nr > limit;

const part2 = (i) => {

    let pos = 0;
    const get = () => i[pos++];

    const walk = () => {
        const [childNodes, metadata] = [get(), get()];

        children = seq(childNodes).map(walk);

        const trans = childNodes === 0
            ? (d) => d
            : (d) => children[d - 1] || 0;

        return seq(metadata)
            .map(get)
            .filter(over(0))
            .map(trans).sum();
    };

    return walk();
};

module.exports = {
    transform,
    part1,
    part2,
    test: 0,
};
