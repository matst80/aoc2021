const {
    seq,
    add,
    mul,
    stringCounter
} = require("../common.js");

const toDec = (bin) => parseInt(bin, 2);

const transform = (input) =>
    input
        .trim()
        .split("")
        .map(d => parseInt(d, 16))
        .map((val) => ({
            val, bin: (val >>> 0).toString(2).padStart(4, "0")
        }));

const getLengthsAndData = (numberOfPackets, availableData, length) => {
    let actualLength = 0;
    seq(numberOfPackets).forEach(() => {
        actualLength += getHeader(availableData.substring(actualLength)).length;
    });

    return {
        packetData: availableData.substr(0, actualLength),
        length: actualLength + length,
        actualLength,
        numberOfPackets
    };
}

const countLiterals = (data) => {
    let literalPackets = 0;
    while (data[literalPackets++ * 5] === "1") { }
    const packetDataLengthInBits = literalPackets * 5;
    const packetData = data.substr(0, packetDataLengthInBits);
    return { packetDataLengthInBits, packetData, literalPackets };
}

const getHeader = (bin) => {
    const [get, getLength] = stringCounter(bin);
    const version = toDec(get(3));
    const typeId = toDec(get(3));
    const isLiteral = typeId === 4;
    const i = isLiteral ? false : toBool(get(1));

    const header = {
        version,
        isLiteral,
        typeId,
        i,
    };

    if (!isLiteral) {
        const size = toDec(get(i ? 11 : 15));
        return (i) ? {
            ...header,
            ...getLengthsAndData(size, get(), getLength())
        } : { 
            ...header, 
            packetData: get(size), 
            length: getLength() 
        };
    } else {

        const { packetDataLengthInBits, ...rest } = countLiterals(get());
        return {
            ...header,
            ...rest,
            packetDataLengthInBits,
            length: getLength() + packetDataLengthInBits,
        };
    }
};

const parsePacket = (header) => {
    const { packetData, isLiteral, literalPackets = 0 } = header;

    if (isLiteral) {
        const binaryValue = seq(literalPackets)
            .map((_, idx) => packetData.substr(idx * 5 + 1, 4))
            .join("");

        return { ...header, literal: toDec(binaryValue) };
    } else {
        let start = 0;
        let children = [];
        let subData = packetData.substring(start);
        while (subData.length) {
            let sub = getHeader(subData);
            children.push(parsePacket(sub));
            subData = packetData.substring((start += sub.length));
        }
        return { ...header, children };
    }
};

const toBool = (bin) => bin === "1";

const part1 = (i) => {
    let v = 0;
    const sumVersion = (node) => {
        v += node.version;
        if (node.children) {
            node.children.forEach(sumVersion);
        }
    };

    sumVersion(parsePacket(getHeader(i.map((d) => d.bin).join(""))));

    return v;
};

const part2 = (i) => {
    const calculateNode = (node) => {
        if (node.children) {
            const childData = node.children.map(calculateNode);

            if (node.typeId === 0) return childData.reduce(add, 0);
            if (node.typeId === 1) return childData.reduce(mul, 1);
            if (node.typeId === 2) return Math.min(...childData);
            if (node.typeId === 3) return Math.max(...childData);
            // 4 is missing?
            if (node.typeId === 5) return childData[0] > childData[1] ? 1 : 0;
            if (node.typeId === 6) return childData[0] < childData[1] ? 1 : 0;
            if (node.typeId === 7) return childData[0] === childData[1] ? 1 : 0;
        }

        if (node.isLiteral) {
            return node.literal;
        }
    };

    return calculateNode(parsePacket(getHeader(i.map((d) => d.bin).join(""))));
};

module.exports = {
    transform,
    part1,
    part2,
    test: 0,
};
