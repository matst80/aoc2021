const { seq, log } = require("../common.js");
const { Graph } = require("../graph.js");

const transform = (input) => {
    const graph = Graph(input
        .split("\n")
        .trim()
        .map((line) => {
            const [from, to] = line.split("-").trim();
            return { from, to };
        }), defaultOptions);
    return { graph, start: graph.getNode('start') }
}

const isLower = (a) => a === a.toLowerCase();

const defaultOptions = {
    nodeParser: (node) => ({
        ...node,
        isLarge: !isLower(node.id),
        edge: node.id === 'start' || node.id === "end",
    }),
    historyParser: (all, next) => {
        return (next.isLarge) ? all : [...all, next.id];
    }
};

const part1 = ({ graph, start }) => {
    let count = 0;

    graph.traverse(start, ({ id, isLarge, edge }, _, history) => {
        if (id == "end") {
            count++;
            return false;
        }
        return !edge && (isLarge || history.indexOf(id) === -1);
    });
    return count;
};

const part2 = ({ graph, start }) => {
    let count = 0;
    graph.traverse(start, ({ id, isLarge, edge }, _, history) => {
        if (id == "end") {
            count++;
            return false;
        }

        return !edge && (isLarge || history.indexOf(id) === -1 || !history.some((i, pos) => history.indexOf(i) !== pos));
    });
    return count;
};

module.exports = {
    transform,
    part1,
    part2,
    test: 0,
};
