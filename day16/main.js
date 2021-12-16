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


const parts = [
    { name: 'V', length: 3 },
    { name: 'T', length: 3 },
    { name: 'I', length: 1 },
]

const getHeader = (bin) => {
    const typeId = toDec(bin.substr(3, 3));
    const i = toBool(bin.substr(6, 1));
    const isLiteral = typeId === 4;
    const packetLengthSize = i?11:15;
    const packets = 
    return {
        version: toDec(bin.substr(0, 3)),
        isLiteral,
        typeId,
        i,
        data: bin.substr(isLiteral ? 6 : 7)
    }
}

const parsePacket = ({ typeId, i, data, version }) => {

    

    

    //console.log('parsing', typeId, version, data);
    if (typeId === 4) {
        let cnt = 0;
        let ok = data[cnt * 5] === '1';
        while (ok) {
            ok = data[cnt++ * 5] === '1'
        }
        const dataLength = cnt*5;
        const numbers = seq(cnt).map((_, nr) => data.substr(nr * 5 + 1, 4)).join('');

        const rest = data.substr(dataLength,data.length-dataLength);
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
                start+=subPacket.length;
                if (start<dataLength) {
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


    const data = parsePacket(getHeader(binary));

    console.log('main data', data);




    return data.version;
}

const part2 = (i) => {
    const result = undefined;
    return result;
}

module.exports = {
    transform, part1, part2, test: 1
}