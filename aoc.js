const fs = require('fs');

const isValid = (d) => d && d !== null && d.length;

const getInput = (day) => {
    console.log('Loading data for', day);
    const mainFile = `./${day}/input.txt`;
    const testFile = `./${day}/test.txt`;
    return [
        fs.existsSync(mainFile) ?
            fs.readFileSync(mainFile).toString() : null,
        fs.existsSync(testFile) ?
            fs.readFileSync(testFile).toString() : null
    ];
}

const run = ({ transform, part1, part2 }, input) => {
    const data = transform(input);
    try {
        const a = part1(data);
        console.log(`Part1: `, a)
    }
    catch (err) {
        console.error('Part1', err);
    }
    if (part2) {
        try {
            const b = part2(data);
            if (b !== undefined) {
                console.log(`Part2: `, b);
            }
        }
        catch (err) {
            console.error('Part1', err);
        }
    }
}

const loadJs = (file, cb) => {
    try {
        const jsFile = fs.realpathSync(file);
        const isLoaded = Boolean(require.cache[jsFile]);
        if (isLoaded) {
            delete require.cache[jsFile];
        }
        return require(file);
    }
    catch (err) {
        console.error(err);
        return {};
    }
}

const days = {};
let answers = require('./answers');

const registerDay = (day) => {
    const execute = () => {
        if (isValid(testInput)) {
            console.log(`\nRunning ${day} with testdata:`);
            run(dayModule, testInput);
        }
        if (isValid(input)) {
            console.log(`\nRunning ${day} with REAL data:`);
            run(dayModule, input);
        }
    }
    let [input, testInput] = getInput(day);
    let dayModule = loadJs(`./${day}/main.js`);
    execute();
    const result = {
        reloadData: () => {
            [input, testInput] = getInput(day);
            execute();
        },
        reloadMain: () => {
            dayModule = loadJs(`./${day}/main.js`);
            execute();
        }
    }
    days[day] = result;
    return result;
}

const getDay = (day) => {
    if (!days[day]) {
        return registerDay(day);
    }
    return days[day];
}

const now = new Date();
const currentDate = now.getDate();
const currentDir = `./day${currentDate}`;
if (!fs.existsSync(currentDir)) {
    console.log('Prepairing day...');
    fs.mkdirSync(currentDir);
    fs.copyFileSync('./_day/main.js', currentDir + '/main.js');
    fs.copyFileSync('./_day/test.txt', currentDir + '/test.txt');
    fs.copyFileSync('./_day/input.txt', currentDir + '/input.txt');
}
else {
    console.log('Directory exists...');
}
getDay('day' + currentDate);

fs.watch('./', { encoding: 'utf8', recursive: true }, (e, file) => {
    if (file.includes('/')) {
        const [day, name] = file.split('/');
        const dayFn = getDay(day);
        if (name.includes('.js'))
            dayFn.reloadMain();
        else {
            dayFn.reloadData();
        }

    }
    else if (file.includes('answers.js')) {
        console.log('load answers');
    }
})