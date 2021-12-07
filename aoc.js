const fs = require('fs');
const { runMain } = require('module');

const getInput = (day) => {
    const mainFile = `./${day}/input.txt`;
    const testFile = `./${day}/test.txt`;
    return [
        fs.existsSync(mainFile) ?
            fs.readFileSync(mainFile).toString() : null,
        fs.existsSync(testFile) ?
            fs.readFileSync(testFile).toString() : null
    ];
}

const now = new Date();
const currentDate = now.getDate();
const currentDir = `./day${currentDate}`;
if (!fs.existsSync(currentDir)) {
    console.log('Prepairing day...');
    fs.mkdirSync(currentDir);
    fs.copyFileSync('./_day/main.js',currentDir+'/main.js');
    fs.copyFileSync('./_day/test.txt',currentDir+'/test.txt');
    fs.copyFileSync('./_day/input.txt',currentDir+'/input.txt');
}
else {
    console.log('Directory exists...');
}

let reloadCount = 0;

const run = ({ transform, part1, part2 }, input) => {

    const data = transform(input);
    const a = part1(data);
    console.log(`Part1: `,a)
    if (part2) {
        const b = part2(data);

        console.log(`Part2:`,b)
    }
}

fs.watch('./', { encoding: 'utf8', recursive: true }, (e, file) => {
    if (file.includes('/')) {
        ((fileName) => {
            try {
                const [day, name] = fileName.split('/');
                const jsFile = fs.realpathSync(`./${day}/main.js`);

                if (require.cache[jsFile]) {
                    reloadCount++;
                    console.log('------- '+reloadCount+' --------\n\n');
                    delete require.cache[jsFile];
                }

                const [input, testInput] = getInput(day);

                const dayModule = require(jsFile);
                
                if (testInput && testInput.length) {
                    console.log(`Running ${day} with testdata:`);
                    run(dayModule, testInput);
                }
                if (input && testInput.length) {
                    console.log(`Running ${day} with REAL data:`);
                    run(dayModule, input);
                }
            }
            catch (err) {
                console.error(err);
            }
        })(file);
    }
})