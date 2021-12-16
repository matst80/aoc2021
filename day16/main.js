const { seq, log, makeGrid, gridLoop, extentArray, numbers, numberGrid, charGrid } = require('../common.js');

/*
0 = 0000
1 = 0001
2 = 0010
3 = 0011
4 = 0100
5 = 0101
6 = 0110
7 = 0111
8 = 1000
9 = 1001
A = 1010
B = 1011
C = 1100
D = 1101
E = 1110
F = 1111
*/

const toDec = (bin) => parseInt(bin, 2);

const transform = input => input.trim().split('').map(chr => {
    const val = parseInt(chr, 16);
    return { chr, val, bin: (val >>> 0).toString(2).padStart(4, '0') };
}
);

//const tt = '00111000000000000110111101000101001010010001001000000000';


const counter = (bin) => {
    let current = 0;
    return [
        (len) => {
            if (len === undefined) {
                const rest = bin.substring(current);
                //len += rest;
                return rest;
            }
            const data = bin.substr(current, len);
            current += len;
            return data;
        }, () => current
    ];
}


const getHeader = (bin) => {

    const [get, getLength] = counter(bin);
    const version = toDec(get(3));
    const typeId = toDec(get(3));
    const isLiteral = typeId === 4;
    const i = isLiteral ? false : toBool(get(1));
    //console.log(version, typeId, length);

    //const dataIncludingLength = bin.substr(length);
    const header = {
        version,
        isLiteral,
        typeId,
        i,
        //data
    };

    if (!isLiteral) {

        const packetDataLengthInBits = i ? 11 : 15;
        const packetLength = toDec(get(packetDataLengthInBits));

        if (i) {
            
            const packetData = get();
            console.log('packets to fetch headers for', packetData);
            let actualLength = 0;
            seq(packetLength).forEach(() => {
                const h = getHeader(packetData.substring(actualLength));
                console.log('got sub',h);
                actualLength += h.length;
            })
            console.log('parsed headers', actualLength, packetLength);
            return { ...header, packetData:packetData.substr(0,actualLength), length: getLength() + actualLength, actualLength, packetLength}
        }
        
        const packetData = get(packetLength);

        return { ...header, packetData, length: getLength(), packetLength }
    }
    else {
        let cnt = 0;
        const data = get();
        console.log('literal data to parse', data, getLength(), header, bin);
        while (data[cnt++ * 5] === '1') {

        }
        const packetDataLengthInBits = cnt * 5;

        console.log('length??', packetDataLengthInBits);
        const packetData = data.substr(0, packetDataLengthInBits);
        return { ...header, packetData, literalPackets: cnt, length: getLength() + packetDataLengthInBits }
    }
}

const parsePacket = (header) => {
    const { typeId, i, packetData, version, isLiteral } = header;
    console.log('parent', header);

    if (isLiteral) {
        const { literalPackets } = header;
        const binaryValue = seq(literalPackets).map((_, nr) => packetData.substr(nr * 5 + 1, 4)).join('');
        console.log(toDec(binaryValue));
        return { ...header, literal: toDec(binaryValue) };
    }
    else {
        let start = 0;
        let children = [];
        let subData = packetData.substring(start);
        while (subData.length) {
            console.log('parsing sub', start, subData.length);
            let sub = getHeader(subData);
            children.push(parsePacket(sub));
            //console.log(sub.);
            start += sub.length;
            subData = packetData.substring(start)
        }
        return { ...header, children }
    }
    return;
    //console.log('parsing', typeId, version, data);
    if (typeId === 4) {
        let cnt = 0;
        let ok = data[cnt * 5] === '1';
        while (ok) {
            ok = data[cnt++ * 5] === '1'
        }
        const dataLength = cnt * 5;
        const numbers = seq(cnt).map((_, nr) => data.substr(nr * 5 + 1, 4)).join('');

        const rest = data.substr(dataLength, data.length - dataLength);
        console.log('literal length', rest, toDec(numbers));
        //const expectedLength = Math.ceil(data.length / 4) * 4;


        //const literalBinary = data.padStart(expectedLength);

        //console.log('literal', data, packetLength, dataLength);
        return { literal: toDec(numbers), version, typeId, dataLength };
    }

    const packetLength = i ? 11 : 15;
    const dataLength = toDec(data.substr(0, packetLength));

    if (dataLength && dataLength > 0) {


        //const packetData = data.substr(packetLength, i ? packetLength * 11 : dataLength);
        //const rest = data.substr(packetData.length);


        if (i) {
            const subPackets = seq(dataLength).map((_, j) => {
                const subData = data.substr(j * 11, 11);
                return parsePacket(getHeader(subData))
            })

            return { dataLength, version, typeId, packetData, rest, packetLength, subPackets };
        }
        else {
            console.log('sub packets parsing', packetData, packetLength)
            let toParse = packetData;
            let start = 0;
            const subPackets = [];
            while (toParse && toParse.length) {
                const subPacket = parsePacket(getHeader(toParse));
                console.log('parsed sub packet', subPacket);
                subPackets.push(subPacket);
                start += subPacket.length;
                if (start < dataLength) {
                    console.log('one more');
                    toParse = packetData.substr(start);
                }
                else {
                    toParse = undefined;
                }
            }
            //console.log(dataLength, packetData);

            console.log('subs', subPackets);

            return { dataLength, version, typeId, packetData, rest, packetLength, subPackets };
        }
    }
    console.log('no data?', data);
    return { dataLength, version, typeId };

}

const toBool = (bin) => bin === '1';

const ttt = 'EE00D40C823060';

const part1 = (i) => {

    const binary = i.map(d => d.bin).join('');
    //const binary = '11010001010';

    const data = parsePacket(getHeader(binary));

    let v = 0;
    const parse = (node) => {
        v+=node.version;
        if (node.children) {
            node.children.forEach(parse);
        }
    }

    //console.log('main data', data);
    parse(data);
    console.log(data)



    return v;
}

const part2 = (i) => {
    const result = undefined;
    return result;
}

module.exports = {
    transform, part1, part2, test: 0
}