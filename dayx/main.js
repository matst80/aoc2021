const {
    seq,
    numbers,
    add,
} = require("../common.js");

const transform = numbers(" ");

const part1 = (i) => {
    let pos = 0;

    const walk = () => {
        const childNodes = i[pos++];
        const metadataEntries = i[pos++];
        let value = 0;

        seq(childNodes).forEach(() => (value += walk()));
        seq(metadataEntries).forEach(() => (value += i[pos++]));

        return value;
    };

    const v = walk();

    return v;
};

const part2 = (i) => {

    let pos = 0;

    const walk = () => {
        const childNodes = i[pos++];
        const metadataEntries = i[pos++];

        children = seq(childNodes).map(walk);

        const trans = childNodes === 0
            ? (a) => a
            : (d) => children[d - 1] || 0;

        return seq(metadataEntries)
            .map(() => i[pos++])
            .filter((d) => d > 0)
            .map(trans)
            .reduce(add, 0);

    };

    return walk();
};

module.exports = {
    transform,
    part1,
    part2,
    test: 0,
};
