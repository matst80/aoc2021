const fs = require('fs');

const isValid = (d) => d && d !== null && d.length;

const getInput = (day) => {
    console.log('Loading data for', day);
    const mainFile = fs.realpathSync(`./${day}/input.txt`);
    const testFile = fs.realpathSync(`./${day}/test.txt`);
    return [
        fs.existsSync(mainFile) ?
            fs.readFileSync(mainFile).toString() : null,
        fs.existsSync(testFile) ?
            fs.readFileSync(testFile).toString() : null
    ];
}

const run = ({ transform, part1, part2 }, input, [answerA, answerB]) => {
    const data = transform ? transform(input) : input;
    const reset = '\x1b[0m';
    const compare = (a, b) => a !== undefined
        ? a === b
            ? { text: '[OK]', color: '\x1b[32m' }
            : { text: ` [${a}]`, color: '\x1b[31m' }
        : { text: '', color: '\x1b[37m' };

    try {
        const start = Date.now();
        const a = part1(data);
        const diff = Date.now() - start;
        const { text, color } = compare(answerA, a);
        console.log(`Part1: `, a, color, text, reset, `${Math.round(diff)}ms`)
    }
    catch (err) {
        console.error('Part1', err);
    }
    if (part2) {
        try {
            const start = Date.now();
            const b = part2(data);
            const diff = Date.now() - start;
            const { text, color } = compare(answerB, b);
            if (b !== undefined) {
                console.log(`Part2: `, b, color, text, reset, `${Math.round(diff)}ms`);
            }
        }
        catch (err) {
            console.error('Part1', err);
        }
    }
}

const removeCache = (file) => {
    const jsFile = fs.realpathSync(file);
    const isLoaded = Boolean(require.cache[jsFile]);
    if (isLoaded) {
        delete require.cache[jsFile];
    }
}

const loadJs = (file, cb) => {
    try {
        removeCache(file);
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
    let count = 0;
    const execute = () => {
        console.log('-------- ' + (++count) + ' --------');
        const [testAnswer = [], realAnswer = []] = answers[day] ?? [];
        if (isValid(testInput)) {
            console.log(`\nRunning ${day.replace('./', '')} with testdata:`);
            run(dayModule, testInput, testAnswer);
        }
        if (isValid(input) && !test) {
            console.log(`\nRunning ${day.replace('./', '')} with REAL data:`);
            run(dayModule, input, realAnswer);
        }
    }
    let [input, testInput] = getInput(day);
    let { test = false, ...dayModule } = loadJs(`./${day}/main.js`);
    //execute();
    const result = {
        execute,
        reloadData: () => {
            [input, testInput] = getInput(day);
            execute();
        },
        reloadMain: () => {
            dayModule = loadJs(`./${day}/main.js`);
            test = !!dayModule.test;
            execute();
        }
    }
    days[day] = result;
    return result;
}

const cleanDay = (day) => day.replace('./', '');

const getDay = (dayName) => {
    const day = cleanDay(dayName);
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

function debounceFile(func, timeout = 300) {
    let timer;
    return (e, file) => {
        if (!file || file.includes('git'))
            return;
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, [file]); }, timeout);
    };
}


const watchDay = (day) => {
    fs.watch(day, { persistent: false, encoding: 'utf8' }, debounceFile((filePath) => {
        console.clear();
        const dayFn = getDay(day);
        if (filePath.includes('.js'))
            dayFn.reloadMain();
        else {
            dayFn.reloadData();
        }
    }));
}

fs.readdir('./', { withFileTypes: true }, (e, files) => {
    files.filter(d => d.isDirectory() && d.name.startsWith('day')).map(({ name }) => {
        watchDay(`./${name}`);
    });
})

fs.watch('./', { persistent: true, encoding: 'utf8' }, debounceFile((filePath) => {
    if (filePath.includes('answers.js')) {
        console.clear();
        console.log('\nReload answers\n');
        answers = loadJs('./answers.js');
        Object.values(days).forEach(d => d.execute());
    }
    else if (filePath.includes('.js') && filePath !== 'aoc.js') {
        console.clear();
        console.log('\nReload ' + filePath + '\n');
        removeCache('./' + filePath);
        Object.values(days).forEach(d => d.reloadMain());
    }
}));


