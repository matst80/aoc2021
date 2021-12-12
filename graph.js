
const Graph = (edges, { nodeParser, historyParser } = {}) => {
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
            const path = historyParser !== undefined ? historyParser(history, node) : [...history, node];
            if (cb(relation, node, path)) {
                traverse(relation, cb, path);
            }
        });
        return state;
    };

    return {
        getNode,
        nodes,
        traverse,
    };
};
module.exports = {
    Graph
}