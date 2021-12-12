<<<<<<< HEAD
const { extentArray, getClosest, makeGrid, formatGrid, count } = require('../common.js');

const transform = () => makeGrid(5, 5);

=======
const { seq, gridLoop, extentArray, getClosest, makeGrid, formatGrid, count,log } = require('../common.js');

const transform = () => makeGrid(5, 5);

class Pipe {
    constructor(input, history = []) {
        this.history = history;
        this.input = input;
        this.output = undefined;
    }
    setOutput(data) {
        this.output = data;
        return new Pipe(data, [...this.history, this.input]);
    }
    get value() {
        return (this.output || this.input);
    }
    toString() {
        return this.value.toString();
    }
}

Pipe.prototype.number = function () {
    let output = this.input;
    if (Array.isArray(this.input)) {
        output = this.input.map(Number);
    }
    else
        output = Number(this.input.trim());

    return this.setOutput(output);
}

Pipe.prototype.filter = function (fn) {
    const output = this.input.filter(fn);
    return this.setOutput(output);
}

>>>>>>> c44669244dd3f6f62f17ae7664db087f29d238d0
const part1 = (i) => {
    const size = extentArray(i);
    const getClose = getClosest(size, true);
    const setValue = (value) => ({ x, y }) => i[y][x] = value;
    getClose({x:2, y:2}).forEach(setValue(1));
    console.log(formatGrid(i,d=>d===1));
    const cnt = count(1);
    return cnt(i.flat());
}

const part2 = (i) => {
    const stringPipe = new Pipe(['11233', '12', 22, true]).number().filter(v => v > 12);
    console.log('string value: ' + stringPipe);
    return stringPipe+'';
}

module.exports = {
    transform, part1, part2
}