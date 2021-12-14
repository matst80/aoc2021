const { seq, log, makeGrid, gridLoop, extentArray, numbers, numberGrid, charGrid, count, asNumbers } = require('../common.js');

const transform = (input) => {
    const [start, _, ...rest] = input.split('\n');

    const react = rest.map(r => {

        const [a, b] = r.split('->').map(d => d.trim());
        const t = a.trim().split('');

        return { from: a.trim().split(''), to: b, result: t[0] + b.trim() + t[1] };
    })
    return { start: start.split(''), react };
}

const part1 = ({ start, react }) => {
    let data = start;
    const step = () => {
        let add = [];
        for (var p = 1; p < data.length; p++) {
            const a = data[p - 1];
            const b = data[p];
            react.filter(d => d.from[0] === a && d.from[1] === b).forEach(r => {
                add.push({p,chr:r.to});
            });
        }
        add.forEach(({p,chr},add)=>{
            data.splice(p+add,0,chr);
        })
        //console.log(add);
    }
    seq(10).forEach(step)
    
    //console.log(data.join(''),data.length);
    const elms = data.reduce((sum,i)=>{
        return {...sum,[i]:(sum[i]??0)+1}
    },[]);
    const sortedValues = Object.values(elms).sort(asNumbers);
    
    return sortedValues.last()-sortedValues[0];
}

const part2 = ({ start, react }) => {
    let data = start;
    const step = () => {
        let add = [];
        for (var p = 1; p < data.length; p++) {
            const a = data[p - 1];
            const b = data[p];
            react.filter(d => d.from[0] === a && d.from[1] === b).forEach(r => {
                add.push({p,chr:r.to});
            });
        }
        add.forEach(({p,chr},add)=>{
            data.splice(p+add,0,chr);
        })
        //console.log(add);
    }
    seq(40).forEach(step)
    
    //console.log(data.join(''),data.length);
    const elms = data.reduce((sum,i)=>{
        return {...sum,[i]:(sum[i]??0)+1}
    },[]);
    const sortedValues = Object.values(elms).sort(asNumbers);
    console.log(sortedValues);
    console.log(sortedValues.last()-sortedValues[0]);

    return sortedValues.last()-sortedValues[0];
}

module.exports = {
    transform, part1, part2, test: 0
}