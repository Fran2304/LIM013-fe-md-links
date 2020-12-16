const { mdlinks } = require('../src/app.js');

const dirAbsolute = 'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1';

const myArrayWithProperties = [
  {
    file: 'D:\\Proyectos\\LIM013-fe-md-links\\example\\a.md',
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    status: 200,
    message: 'OK',
  },
  {
    file: 'D:\\Proyectos\\LIM013-fe-md-links\\example\\a.md',
    href: 'https://nodejs.org/es/',
    text: 'Node.js',
    status: 200,
    message: 'OK',
  },
  {
    file: 'D:\\Proyectos\\LIM013-fe-md-links\\example\\a.md',
    href: 'https://developers.google.com/v8/',
    text: 'motor de JavaScript V8 de Chrome',
    status: 200,
    message: 'OK',
  },
  {
    file: 'D:\\Proyectos\\LIM013-fe-md-links\\example\\a.md',
    href: 'https://es.wikipedia.org/wiko/Markdown',
    text: 'wiko',
    status: 404,
    message: 'Not Found',
  },
  {
    file: 'D:\\Proyectos\\LIM013-fe-md-links\\example\\a.md',
    href: 'https://nodejs.org/es/',
    text: 'Node.js',
    status: 200,
    message: 'OK',
  },
];

const myArrayWithoutProperties = [
  {
    file: 'D:\\Proyectos\\LIM013-fe-md-links\\example\\a.md',
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
  },
  {
    file: 'D:\\Proyectos\\LIM013-fe-md-links\\example\\a.md',
    href: 'https://nodejs.org/es/',
    text: 'Node.js',
  },
  {
    file: 'D:\\Proyectos\\LIM013-fe-md-links\\example\\a.md',
    href: 'https://developers.google.com/v8/',
    text: 'motor de JavaScript V8 de Chrome',
  },
  {
    file: 'D:\\Proyectos\\LIM013-fe-md-links\\example\\a.md',
    href: 'https://es.wikipedia.org/wiko/Markdown',
    text: 'wiko',
  },
  {
    file: 'D:\\Proyectos\\LIM013-fe-md-links\\example\\a.md',
    href: 'https://nodejs.org/es/',
    text: 'Node.js',
  },
];

describe('mdlinks', () => {
  test('mdlinks is a function', () => {
    expect(typeof mdlinks).toBe('function');
  });

  test('return only 3 properties', () => mdlinks(dirAbsolute, { validate: false }).then((response) => {
    expect(response).toEqual(myArrayWithoutProperties);
  }));

  test('return 5 properties', () => mdlinks(dirAbsolute, { validate: true }).then((response) => {
    expect(response).toEqual(myArrayWithProperties);
  }));
});
