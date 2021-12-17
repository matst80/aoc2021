const { seq } = require('../common.js');

const transform = input => {
    const [_, x, y] = input.match(/x=(.+), y=(.+)/)
    const [x1, x2] = x.split('..').map(Number);
    const [y1, y2] = y.split('..').map(Number);


    return { x1, y1, x2, y2 };
};

const isInside = ({ x1, y1, x2, y2 }) => (x, y) => {
    return (x >= x1 && x <= x2 && y >= y1 && y <= y2);
}

const min = -99999999999;

const shoot = (coords) => {
    const inside = isInside(coords);
    const { x2, y1 } = coords;
    return (dx, dy) => {
        let [x, y] = [0, 0];
        let maxY = min;
        while (x <= x2 && y >= y1) {
            x += dx;
            y += dy;
            maxY = Math.max(maxY, y);
            dx -= Math.sign(dx);
            dy--;
            if (inside(x,y)) return maxY;
        }
    }
}

const brute = (data) => {
    const { y1, x2 } = data;
    let maxY = min;
    let c = 0;

    const fire = shoot(data);

    for (let vy = y1; vy < -y1; vy++) {
        for (let vx = x2; vx > 0; vx--) {
            let r = fire(vx, vy);
            if (r != null) {
                c++;
                maxY = Math.max(maxY, r);
            }
        }
    }
    return { count: c, maxY }
}

const part1 = (data) => {
    const { maxY } = brute(data);
    return maxY;
}

const part2 = (data) => {
    const { count } = brute(data);
    return count;
}

module.exports = {
    transform, part1, part2, test: 0
}