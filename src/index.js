/* eslint-disable no-unused-expressions */

import fetch from 'node-fetch';

/* eslint-disable object-shorthand */
const fs = require('fs');
const marked = require('marked');
const jsdom = require('jsdom');
// const fetch = require('node-fetch');

const { JSDOM } = jsdom;

// const renderer = new marked.Renderer();
const path = require('path');

// Example paths
const fileRelative = '..\\README.md';
const fileAbsolute = 'D:\\Proyectos\\LIM013-fe-md-links\\example\\a.md';
const dirAbsolute = 'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1';
// const dirRelative = '..\\example\\dir1';

// Validate if the route exists. Return a boolean value
export const routeExist = (route) => fs.existsSync(route);
console.log('exists:', routeExist(fileRelative));

// Iy is a path absolute? Return a boolean value
export const pathIsAbsolute = (route) => path.isAbsolute(route);
console.log('is absolute?:', pathIsAbsolute(fileAbsolute));

// Replace a relative  path to absolute path
export const transformAbsolute = (route) => path.resolve(route);
console.log('transform abosule:', transformAbsolute(fileRelative));

// Estructura de file. Es el ino quien dice que tipo de archivo es.
// const viewStat = (route) => fs.lstatSync(route);
// console.log('what dir', viewStat(dirAbsolute));
// console.log('what file', viewStat(fileAbsolute));

// It is a directory? Return a boolean
export const verifyDirectory = (route) => fs.lstatSync(route).isDirectory();
console.log('is directory?', verifyDirectory(dirAbsolute));

// It is a file? Return a boolean
const verifyFile = (route) => fs.lstatSync(route).isFile();
console.log('is file?', verifyFile(dirAbsolute));

// ---------------------- It is a md file? ---------------
// Método path.extname nos da la extensión.
export const extensionFile = (route) => path.extname(route);
console.log('extension', extensionFile(fileAbsolute));

const validateMd = (extensionFile(fileAbsolute) === '.md') ? 'true' : 'false';
console.log('is it md', validateMd);

// -------------------------- Read files--------------------
// Con readFileSync se lee archivo, codificación x default es utf8. Se obtiene el contenido en
// en contenido markdown.
export const contentFile = (route) => fs.readFileSync(route, 'utf8');
// console.log(contentFile(fileAbsolute));
// const contentAll = contentFile(fileAbsolute);

// -----------------------------Extrayendo links con regular expresions ---------
// const regEx = /\[.+\]\(https:\/\/?.*\)/gi;

// console.log(contentAll.match(regEx)); // Se obtiene un array con todas las coincidencias.
// console.log(regEx.exec(contentAll)); // Se obtiene un array, devuelve solo el primero en coincidir
// ----------------------- Extrayendo links con marked y con jsdom --------------------
// Primero usando marked se cambia el cotenido a html, usando el paquete jsdon se extrane las etiquetas <a></a>
//

// Turn markdown into a html
// const html = marked(contentFile(fileAbsolute));
// console.log(html);

// const dom = new JSDOM(html);
// const links = dom.window.document.querySelectorAll('a');
// console.log('links', links);
// const prueba = Array.from(links);
// console.log('prueba', prueba[0]);
// const arrayLinks = [];
// links.forEach((link) => {
//   arrayLinks.push({
//     file: fileAbsolute,
//     href: link.href,
//     text: link.text,
//   });
// });
// console.log('array links', arrayLinks);

const getMdLinks = (route) => {
  const html = marked(contentFile(route));
  // console.log(html);
  const dom = new JSDOM(html);
  const links = dom.window.document.querySelectorAll('a');
  // console.log('links', links);
  // const prueba = Array.from(links);
  // // console.log('prueba', prueba[0]);
  const arrayLinks = [];
  links.forEach((link) => {
    arrayLinks.push({
      file: fileAbsolute,
      href: link.href,
      text: link.text,
    });
  });
  return arrayLinks;
};

const readDir = (route) => fs.readdirSync(route);
console.log(readDir(dirAbsolute));
// --------------------- Leyendo directorio --------------
// Usando recursividad. Primero se identifica caso base y de ahí caso de recursividad

const walk = (route) => {
  let allFiles = [];
  if (verifyFile(route)) {
    allFiles.push(route);
  } else {
    readDir(route).forEach((element) => {
      // const completedPath = `${path}\\${element}`; //puede haber problemas en otros sitemas operativos
      const completedPath = path.join(route, element);
      allFiles = allFiles.concat(walk(completedPath));
    });
  }
  return allFiles;
};
console.log('recursividad', walk(dirAbsolute));

// --------------------------- mdlinks ------------------------

const mdlinks = (route, options) => {
  if (routeExist(route)) {
    let routeToVerify = 0;
    if (pathIsAbsolute(route)) {
      routeToVerify = route;
      // console.log('siempre fue absoluta', routeToVerify);
    } else {
      routeToVerify = transformAbsolute(route);
      // console.log('fue relativa y cambió', routeToVerify);
    }
    let filesToVerify = 0;
    if (verifyDirectory(routeToVerify)) {
      filesToVerify = walk(routeToVerify);
      // console.log('aqui es directorio', filesToVerify);
    } else {
      filesToVerify = [routeToVerify];
      console.log('aqui es file', filesToVerify);
    }
    const arrayMd = [];
    filesToVerify.forEach((file) => {
      if (extensionFile(file) === '.md') {
        arrayMd.push(file);
      }
      if (arrayMd.length === '') {
        console.log('No hay archivos md');
      }
    });
    console.log('arrayMd', arrayMd);
    let arrayLinks = [];
    arrayMd.forEach((file) => {
      arrayLinks = arrayLinks.concat(getMdLinks(file));
      // console.log(getMdLinks(file));
    });
    console.log(arrayLinks);
    if (options.validate === true) {
      // eslint-disable-next-line array-callback-return
      arrayLinks.forEach((element) => {
        fetch(element.href).then((res) => {
          console.log(element.href, element.text, element.file, res.status, res.statusText);
        }).catch((error) => {
          console.log(error);
        });
      });
    }
  } else {
    console.log('La ruta no existe');
  }
};

mdlinks(dirAbsolute, { validate: true });
