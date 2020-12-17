/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
const fetchMock = require('node-fetch');

const { validate } = require('../src/index.js');

jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox()); // Seccion node fetch https://www.npmjs.com/package/fetch-mock-jest

fetchMock
  .mock('https://es.wikipedia.org/wiki/Markdown', 200, { overwriteRoutes: false })
  .mock('https://nodejs.org/es/', 200)
  .mock('https://developers.google.com/v8/', 200)
  .mock('https://es.wikipedia.org/wiko/Markdown', 400)
  .mock('https://nodejs.org/es/', 200, { overwriteRoutes: false });

const dirAbsolute = 'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1';

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
    status: 400,
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

// validate

describe('return an objetc', () => {
  it('return object with href, file, text, status, message properties', () => {
    validate(dirAbsolute).then((res) => {
      expect(res).toEqual(myArray);
    }).catch((error) => {
      console.log(error);
    });
  });
});

// Resources:
// https://www.npmjs.com/package/fetch-mock ==> http://www.wheresrhys.co.uk/fetch-mock/
// https://www.npmjs.com/package/fetch-mock-jest
