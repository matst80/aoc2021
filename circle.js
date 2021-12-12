const circleList = () => {
    let current = undefined;
    return {
        append: (value) => {
            if (current === undefined) {
                current = { value }
                current.next = current;
                current.prev = current;
            }
            else {
                let next = {
                    value,
                    next: current.next,
                    prev: current
                }
                current.next.prev = next;
                current.next = next;

                current = next;
            }
        },
        value: () => {
            return current.value;
        },
        rotate: (nr) => {
            let res = current;
            const fn = nr > 0 ? 'next' : 'prev';
            for (var i = 0; i < Math.abs(nr); i++) {
                res = res[fn];
            }
            current = res;
            return res;
        },
        pop: () => {
            const value = current.value;
            current.prev.next = current.next;
            current.next.prev = current.prev;
            current = current.prev;
            return value;
        }
    }
}

module.exports = {
    circleList
}