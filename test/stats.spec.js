/* eslint-disable no-useless-concat */
/* eslint-disable prefer-template */
// const chalk = require('chalk');
const { optionStatsVal, optionStatsOnly } = require('../src/optionStats.js');

const resultStatsOnly = 'Total Links:' + 5 + 'Unique Links: ' + 4;
const resultStatsValidate = 'Total Links:' + 5 + 'Unique Links: ' + 4 + 'Valid Links:' + 4 + 'Broken Links:' + 1;

const myArray = [
  {
    file: 'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1\\b.md',
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    status: 200,
    message: 'OK',
  },
  {
    file: 'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1\\b.md',
    href: 'https://nodejs.org/es/',
    text: 'Node.js',
    status: 200,
    message: 'OK',
  },
  {
    file: 'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1\\b.md',
    href: 'https://developers.google.com/v8/',
    text: 'motor de JavaScript V8 de Chrome',
    status: 200,
    message: 'OK',
  },
  {
    file: 'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1\\b.md',
    href: 'https://es.wikipedia.org/wiko/Markdown',
    text: 'wiko',
    status: 404,
    message: 'Bad Request',
  },
  {
    file: 'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1\\b.md',
    href: 'https://nodejs.org/es/',
    text: 'Node.js',
    status: 200,
    message: 'OK',
  },
];

describe('optionStats', () => {
  it('return total and unique', () => {
    expect(typeof optionStatsOnly).toBe('function');
  });

  it('return total and unique', () => {
    expect(optionStatsOnly(myArray)).toBe(resultStatsOnly);
  });
});

describe('optionStatsValidate', () => {
  it('return total and unique', () => {
    expect(typeof optionStatsVal).toBe('function');
  });
  it('return total and unique', () => {
    console.log(optionStatsVal(myArray));
    expect(optionStatsVal(myArray)).toBe(resultStatsValidate);
  });
});
