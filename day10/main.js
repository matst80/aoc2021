const {
    seq,
    chars,
    lower,
    manhattan,
    stepper,
    numbers,
    add,
} = require("../common.js");

const transform = (data) =>
    data.split("\r\n").map((line) => line.trim().split(""));

const parts = [
    ["(", ")"],
    ["[", "]"],
    ["{", "}"],
    ["<", ">"],
];

const values = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
};

const hasStartChar = (chr) => parts.some(([s]) => s === chr);

const endChar = (start) => parts.find(([s]) => s === start)[1];

const removeIncorrect = (line) => {
    const len = line.length;

    let pos = 0,
        walked = [];
    (started = []), (char = undefined);

    const walk = () => {
        if (pos < len) {
            char = line[pos++];
            if (hasStartChar(char)) {
                started.push(char);
                walked.push(char);
                return walk();
            } else if (endChar(started[started.length - 1]) === char) {
                walked.push(char);
                started.pop();
                return walk();
            } else {
                return;
            }
        }
    };
    walk();

    if (pos !== len) {
        return values[char];
    }
    return 0;
};

const autoCompleteValues = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
};

const autoCorrect = (line) => {

    let pos = 0;
    let walked = [];
    let started = [];
    let corrected = [];
    let added = 0;
    let char = undefined;

    //console.log("starting line", line);
    const walk = () => {

        if (started.length > 0 || pos <= line.length) {
            char = line[pos];

            //console.log('testing',char,pos, corrected.join(''), pos, line.length);
            if (hasStartChar(char)) {
                started.push(char);
                walked.push(char);
                pos++;
                walk();
            } else {
                if (started.length === 0)
                    return;

                const shouldBe = endChar(started[started.length - 1]);
                if (shouldBe === char) {
                    walked.push(char);
                    started.pop();
                    pos++;
                    walk();
                } else {
                    corrected.push(shouldBe);
                    line.splice(pos, 0, shouldBe);

                    added *= 5;
                    added += autoCompleteValues[shouldBe];

                    walk();
                }
            }
        }
    };
    walk();

    return added;
};

const part1 = (i) => {

    return i.map(removeIncorrect).reduce(add, 0);
};

const countLowerAndHigher = (all) => (t) => {
    return { higher: all.filter(a => a > t).length, lower: all.filter(a => a < t).length, score: t };
}

const part2 = (i) => {
    //return autoCorrect('[({(<(())[]>[[{[]{<()<>>'.split(''));

    const scores = i
        .map(autoCorrect)
    //.filter((d) => d !== 0)
    //.sort((a, b) => a - b);
    const diffs = scores.map(countLowerAndHigher(scores)).sort((a,b) => Math.abs(a.higher - a.lower)-Math.abs(b.higher - b.lower));
    //console.log(diffs);
    return diffs[0].score;
    //return scores[Math.ceil(scores.length / 2)];
};

// not 1217285163
// not 161510319
// to low 1546458444
// 1546458444

module.exports = {
    transform,
    part1,
    part2,
    test: 0,
};
