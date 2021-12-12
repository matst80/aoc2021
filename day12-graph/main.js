const { seq, log } = require("../common.js");

const transform = (input) =>
  input
    .split("\n")
    .trim()
    .map((line) => {
      const [from, to] = line.split("-").trim();
      return { from, to };
    });

const Graph = (edges, { nodeParser } = {}) => {
  const nodeIds = edges.reduce((all, i) => {
    const r = [];
    if (!all.includes(i.from)) r.push(i.from);
    if (!all.includes(i.to)) r.push(i.to);
    return [...all, ...r];
  }, []);

  const nodes = nodeIds.map((id) => {
    const parents = edges
      .filter((d) => d.to === id)
      .map((d) => ({ id: d.from, type: "parent" }));
    const children = edges
      .filter((d) => d.from === id)
      .map((d) => ({ id: d.to, type: "child" }));
    const node = {
      id,
      relations: [...children, ...parents],
      edge: children.length === 0,
    };
    return nodeParser !== undefined ? nodeParser(node) : node;
  });

  const getNode = (id) => nodes.find((d) => d.id === id);

  const traverse = (node, cb, history = []) => {
    const state = {};
    node.relations.forEach(({ id }) => {
      const relation = getNode(id);
      const path = [...history, node];
      if (cb(relation, node, path)) {
        traverse(relation, cb, path);
      }
    });
    return state;
  };

  return {
    getNode,
    traverse,
  };
};

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
    return !edge && (isLarge || !history.some(d=>d.id===id));
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
    const smallCaves = history.filter(d=>!d.isLarge).map(d=>d.id);

    const hasVisitedSmall = smallCaves.some((i,pos) => smallCaves.indexOf(i)!==pos);
    
    return !edge && (isLarge || !history.some(d=>d.id===id) || !hasVisitedSmall);
  });
  return count;
};

module.exports = {
  transform,
  part1,
  part2,
  test: 0,
};
