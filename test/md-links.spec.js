/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import {
  routeExist, pathIsAbsolute, transformAbsolute, verifyDirectory, extensionFile, contentFile,
} from '../src/index.js';

const fileRelative = '.\\example\\a.md';
const fileAbsolute = 'D:\\Proyectos\\LIM013-fe-md-links\\example\\a.md';
const dirAbsolute = 'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1';
const fileC = 'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1\\dir2\\c.md';
// Test exist route
describe('routeExist', () => {
  it('the rout exist', () => {
    expect(typeof routeExist).toBe('function');
  });
  it('should be true if the route exists', () => {
    expect(routeExist(fileRelative)).toBe(true);
  });

  it('should be true  if the route absolute exists', () => {
    expect(routeExist(fileAbsolute)).toBe(true);
  });

  it('should be true  if the route absolute exists', () => {
    expect(routeExist('hola')).toBe(false);
  });
});

// Test  is it a path absolute?

describe('path is absolute', () => {
  it('pathIsAbsolute', () => {
    expect(typeof pathIsAbsolute).toBe('function');
  });
  it('should be true if the route is absolute', () => {
    expect(pathIsAbsolute(fileAbsolute)).toBe(true);
  });

  it('should be false  if the route is relative', () => {
    expect(pathIsAbsolute(fileRelative)).toBe(false);
  });
});

// Test transform path absolute

describe('transformAbsolute', () => {
  it('transformAbsolute', () => {
    expect(typeof transformAbsolute).toBe('function');
  });
  it('turn a relative path into absolute path', () => {
    expect(transformAbsolute(fileRelative)).toBe('D:\\Proyectos\\LIM013-fe-md-links\\example\\a.md');
  });
});

// Test  is it a directory?
describe('isDirectory', () => {
  it('isDirectory', () => {
    expect(typeof verifyDirectory).toBe('function');
  });
  it('should be true if it is a directory', () => {
    expect(verifyDirectory(dirAbsolute)).toBe(true);
  });
});

// Test  is it a md file?

describe('extensionFile', () => {
  it('extensionFile', () => {
    expect(typeof extensionFile).toBe('function');
  });
  it('show extenssion', () => {
    expect(extensionFile(fileAbsolute)).toBe('.md');
  });
});

// Test  is it a md file?

describe('contentFile', () => {
  it('contentFile', () => {
    expect(typeof contentFile).toBe('function');
  });
  it('show extenssion', () => {
    expect(contentFile(fileC)).toBe('¡Hola Mundo!');
  });
});
