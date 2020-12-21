/* eslint-disable import/extensions */
/* eslint-disable no-undef */
// import {
//   routeExist, pathIsAbsolute, transformAbsolute, verifyDirectory, extensionFile, contentFile,
// } from '../src/index.js';

const index = require('../src/index.js');

const fileRelative = '.\\example\\a.md';
const fileAbsolute = 'D:\\Proyectos\\LIM013-fe-md-links\\example\\a.md';
const dirAbsolute = 'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1';
const fileC = 'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1\\dir2\\c.md';
const dirFake = 'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir40';

// Test exist route
describe('routeExist', () => {
  it('the rout exist', () => {
    expect(typeof index.routeExist).toBe('function');
  });
  it('should be true if the route exists', () => {
    expect(index.routeExist(fileRelative)).toBe(true);
  });

  it('should be true  if the route absolute exists', () => {
    expect(index.routeExist(fileAbsolute)).toBe(true);
  });

  it('should be true  if the route absolute exists', () => {
    expect(index.routeExist('hola')).toBe(false);
  });
});

// Test  is it a path absolute?

describe('path is absolute', () => {
  it('pathIsAbsolute', () => {
    expect(typeof index.pathIsAbsolute).toBe('function');
  });
  it('should be true if the route is absolute', () => {
    expect(index.pathIsAbsolute(fileAbsolute)).toBe(true);
  });

  it('should be false  if the route is relative', () => {
    expect(index.pathIsAbsolute(fileRelative)).toBe(false);
  });
});

// Test transform path absolute

describe('transformAbsolute', () => {
  it('transformAbsolute', () => {
    expect(typeof index.transformAbsolute).toBe('function');
  });
  it('turn a relative path into absolute path', () => {
    expect(index.transformAbsolute(fileRelative)).toBe('D:\\Proyectos\\LIM013-fe-md-links\\example\\a.md');
  });
});

// Test  is it a directory?
describe('isDirectory', () => {
  it('isDirectory', () => {
    expect(typeof index.verifyDirectory).toBe('function');
  });
  it('return an array with the elements of a directory', () => {
    expect(index.verifyDirectory(dirAbsolute)).toBe(true);
  });
});

// Test  is it a file?
describe('isAFile', () => {
  it('isAFile', () => {
    expect(typeof index.verifyFile).toBe('function');
  });
  it('should be true if it is a file', () => {
    expect(index.verifyFile(fileAbsolute)).toBe(true);
  });
});

// Test  is it a md file?

describe('extensionFile', () => {
  it('extensionFile', () => {
    expect(typeof index.extensionFile).toBe('function');
  });
  it('show extenssion', () => {
    expect(index.extensionFile(fileAbsolute)).toBe('.md');
  });
});

// Show content

describe('contentFile', () => {
  it('contentFile', () => {
    expect(typeof index.contentFile).toBe('function');
  });
  it('return content in utf8', () => {
    expect(index.contentFile(fileC)).toBe('¡Hola Mundo!');
  });
});

// Test read directory.
describe('readDirectory', () => {
  it('readDirectory', () => {
    expect(typeof index.readDir).toBe('function');
  });
  it('show files in directory', () => {
    expect(index.readDir(dirAbsolute)).toEqual(['b.md', 'dir2', 'dir3']);
  });
});

// Test walk

describe('walkDirectory', () => {
  it('walkDirectory', () => {
    expect(typeof index.walkDirectory).toBe('function');
  });
  it('return all the files in the directory. recursive ', () => {
    expect(index.walkDirectory(dirAbsolute)).toEqual([
      'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1\\b.md',
      'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1\\dir2\\c.md',
      'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1\\dir2\\j.js',
      'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1\\dir3\\hello.html',
    ]);
  });
});

// GetMdlinks
describe('getMdlinks', () => {
  it('getMdlinks', () => {
    expect(typeof index.getMdlinks).toBe('function');
  });
  it('return all the files in the directory. recursive ', () => {
    expect(index.getMdlinks(dirAbsolute)).toEqual([
      {
        file: 'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1\\b.md',
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
      },
      {
        file: 'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1\\b.md',
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
      },
      {
        file: 'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1\\b.md',
        href: 'https://developers.google.com/v8/',
        text: 'motor de JavaScript V8 de Chrome',
      },
      {
        file: 'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1\\b.md',
        href: 'https://es.wikipedia.org/wiko/Markdown',
        text: 'wiko',
      },
      {
        file: 'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1\\b.md',
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
      },
    ]);
  });
  it('return an error if route does not exist', () => {
    expect(index.getMdlinks(dirFake)).toBe(undefined);
  });
});
// , option validate, mdlinks
