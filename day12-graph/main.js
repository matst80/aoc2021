const { seq, log, Graph } = require("../common.js");

const transform = (input) =>
    input
        .split("\n")
        .trim()
        .map((line) => {
            const [from, to] = line.split("-").trim();
            return { from, to };
        });

const isLower = (a) => a === a.toLowerCase();

const START = "start";

const defaultOptions = {
    nodeParser: (node) => ({
        ...node,
        isLarge: !isLower(node.id),
        edge: node.id === START || node.id === "end",
    }),
};

const part1 = (lines) => {
    const graph = Graph(lines, defaultOptions);
    let count = 0;
    graph.traverse(graph.getNode(START), ({ id, isLarge, edge }, _, history) => {
        if (id === "end") {
            count++;
            return false;
        }
        return !edge && (isLarge || !history.some(d => d.id === id));
    });
    return count;
};

const part2 = (lines) => {
    const graph = Graph(lines, defaultOptions);
    let count = 0;

    graph.traverse(graph.getNode(START), ({ id, isLarge, edge }, _, history) => {
        if (id === "end") {
            count++;
            return false;
        }
        const smallCaves = history.filter(d => !d.isLarge);
        const hasVisitedSmall = smallCaves.some((i, pos) => smallCaves.indexOf(i) !== pos);

        return !edge && (isLarge || !history.some(d => d.id === id) || !hasVisitedSmall);
    });
    return count;
};

module.exports = {
    transform,
    part1,
    part2,
    test: 0,
};
