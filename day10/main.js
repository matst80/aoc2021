const { asNumbers, add, charGrid } = require("../common.js");

const transform = charGrid;

const startChars = ["(", "[", "{", "<"];
const endChars = [")", "]", "}", ">"];

const values = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const hasStartChar = (chr) => startChars.includes(chr);

const endChar = (chr) => endChars[startChars.indexOf(chr)];

const removeIncorrect = (line) => {
  const len = line.length;

  let pos = 0;
  const started = [];

  const walk = () => {
    if (pos < len) {
      const char = line[pos++];
      if (hasStartChar(char)) {
        started.push(char);
        return walk();
      } else {
        if (endChar(started.pop()) === char) {
          return walk();
        }
      }
      return char;
    }
  };
  const last = walk();

  return pos !== len ? values[last] : 0;
};

const autoCorrect = (line) => {
  let pos = 0;
  let walked = [];
  let added = 0;

  const walk = () => {
    if (walked.length > 0 || pos <= line.length) {
      const char = line[pos];

      if (hasStartChar(char)) {
        walked.push(char);
        pos++;
        walk();
      } else {
        if (walked.length === 0) return;

        const shouldBe = endChar(walked[walked.length - 1]);
        if (shouldBe === char) {
          walked.pop();
          pos++;
          walk();
        } else {
          line.push(shouldBe);
          //line.splice(pos, 0, shouldBe); // this could autocorrect even invalid strings

          added = added * 5 + (endChars.indexOf(shouldBe) + 1);

          walk();
        }
      }
    }
  };
  walk();

  return added;
};

const part1 = (i) => i.map(removeIncorrect).reduce(add, 0);

const part2 = (i) => {
  const scores = i
    .filter((j) => removeIncorrect(j) === 0)
    .map(autoCorrect)
    .sort(asNumbers);

  return scores[Math.round((scores.length - 1) / 2)];
};

module.exports = {
  transform,
  part1,
  part2,
};
