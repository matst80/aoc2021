const {
    seq,
    log
} = require("../common.js");

const transform = (input) => {
    return input
        .split("\n")
        .trim()
        .map((line) => line.split("-").trim());
};

const isLower = (a) => a === a.toLowerCase();

const walker = (lines, allowVisits) => {
    let paths = [...lines];

    const get = (from) =>
        paths
            .filter(([a, b]) => a === from || b === from)
            .map(([a, b]) => (from === a ? b : a)).filter(d => d !== 'start');

    let toVisit = [{ current: "start", visited: [], canVisit: allowVisits }];
    let count = 0;

    while (toVisit.length > 0) {
        let { current: from, visited, canVisit } = toVisit.pop();

        visited = isLower(from) ? [...visited, from] : visited;

        get(from).forEach(current => {
            if (current === "end") {
                count++;
            } else {
                if (visited.includes(current)) {
                    if (canVisit) {
                        toVisit.push({ current, visited, canVisit: false });
                    }
                } else {
                    toVisit.push({ current, visited, canVisit });
                }
            }
        });

    }

    return count;
};

const part1 = (lines) => {
    return walker(lines, false);
};

const part2 = (lines) => {
    return walker(lines, true);
};

module.exports = {
    transform,
    part1,
    part2,
    test: 0,
};
