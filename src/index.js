/* eslint-disable no-unused-expressions */

/* eslint-disable object-shorthand */
const fs = require('fs');
const marked = require('marked');
const jsdom = require('jsdom');
const fetch = require('node-fetch');

const { JSDOM } = jsdom;

// const renderer = new marked.Renderer(); PROBAR :)
const path = require('path');

// Example paths
// const fileRelative = '..\\README.md';
const fileAbsolute = 'D:\\Proyectos\\LIM013-fe-md-links\\example\\a.md';
const dirAbsolute = 'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1';
// const dirRelative = '..\\example\\dir1';
// const emptyDirectory = 'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1\\dir3';

// Validate if the route exists. Return a boolean value
const routeExist = (route) => fs.existsSync(route);

// It is a path absolute? Return a boolean value
const pathIsAbsolute = (route) => path.isAbsolute(route);

// Replace a relative  path to absolute path
const transformAbsolute = (route) => path.resolve(route);

// Estructura de file. Es el ino quien dice que tipo de archivo es.
// const viewStat = (route) => fs.lstatSync(route);
// console.log('what dir', viewStat(dirAbsolute));
// console.log('what file', viewStat(fileAbsolute));

// It is a directory? Return a boolean
const verifyDirectory = (route) => fs.lstatSync(route).isDirectory();

// It is a file? Return a boolean
const verifyFile = (route) => fs.lstatSync(route).isFile();

// ---------------------- It is a md file? ---------------
// Método path.extname nos da la extensión.
const extensionFile = (route) => path.extname(route);
// console.log('extension', extensionFile(fileAbsolute));

// const validateMd = (extensionFile(fileAbsolute) === '.md') ? 'true' : 'false';
// console.log('is it md', validateMd);

// -------------------------- Read files--------------------
// Con readFileSync se lee archivo, codificación x default es utf8. Se obtiene el contenido en
// en contenido markdown.
const contentFile = (route) => fs.readFileSync(route, 'utf8');

// -------------------------- Read directory ---------------------
const readDir = (route) => fs.readdirSync(route); // Encuentra files y archivos dentro de un directorio y devuelve un arreglo con los "Nombres" no con ruta de estos
// console.log('READ DIRECTORY', readDir(dirAbsolute));
// --------------------- Leyendo directorio --------------
// Usando recursividad. Primero se identifica caso base "verifyFile "y de ahí caso de recursividad "readDir". No usar array externo.
// Retorna un array con todos los paths de los archivos, incluso los que se encnentran dentro de un directorio
const walkDirectory = (route) => {
  let allFiles = [];
  if (verifyFile(route)) {
    allFiles.push(route); // Push añade elementos y modifica el array existente
  } else {
    readDir(route).forEach((element) => {
      // const completedPath = `${path}\\${element}`; //puede haber problemas en otros sistemas operativos
      const completedPath = path.join(route, element); // Como solo tenemos e nombre y la ruta padre, lo unimos para obtener la ruta completa :)
      allFiles = allFiles.concat(walkDirectory(completedPath));// Concat une array y se guarda en una variable.
    });
  }
  return allFiles;
};
// -----------------------------Extrayendo links con regular expresions ---------
// const regEx = /\[.+\]\(https:\/\/?.*\)/gi;

// console.log(contentAll.match(regEx)); // Se obtiene un array con todas las coincidencias.
// console.log(regEx.exec(contentAll)); // Se obtiene un array, devuelve solo el primero en coincidir
// ----------------------- Extrayendo links con marked y con jsdom --------------------
// Se obtiene array de objetos. Cada objeto es un link con sus propiedades.
const getLinks = (route) => {
  const html = marked(contentFile(route)); // se usa marked para transformar el contenido de md a html <>
  const dom = new JSDOM(html);
  const links = dom.window.document.querySelectorAll('a'); // Detecta elementos que coincidad con la etiqueta <a></a>. Devuelve los elementos en un array.
  const arrayLinks = [];
  links.forEach((link) => {
    arrayLinks.push({
      file: route,
      href: link.href,
      text: (link.text).substring(0, 50),
    });
  });
  return arrayLinks;
};
// console.log(getLinks(fileAbsolute));
// -------Extraer md links ----------------
// Retorna un array donce cada objeto tiene las propiedades de file, text y href
// eslint-disable-next-line consistent-return
const getMdlinks = (route) => {
  if (routeExist(route)) {
    const routeToVerify = pathIsAbsolute(route) ? route : transformAbsolute(route);
    const filesToVerify = walkDirectory(routeToVerify);
    const arrayMd = filesToVerify.filter((file) => extensionFile(file) === '.md');
    if (arrayMd.length === 0) {
      console.log('No hay md files');
    } else {
      let arrayLinks = [];
      arrayMd.forEach((file) => {
        arrayLinks = arrayLinks.concat(getLinks(file));
      });
      return arrayLinks;
    }
  } else {
    console.log('La ruta no existe');
  }
};
// console.log(getMdlinks(dirAbsolute));

// ------------------------- option Validate-----------------
const validate = (route) => {
  const arrayLinks = getMdlinks(route);
  const allLinks = arrayLinks.map((element) => fetch(element.href).then((res) => ({
    href: element.href,
    text: (element.text).substring(0, 50),
    file: element.file,
    status: res.status,
    message: res.statusText,
  })).catch((error) => ({
    href: element.href,
    text: element.text,
    file: element.file,
    status: 'fail',
    message: error.message,
  })));
  return Promise.all(allLinks);
  // Promise.all(allLinks).then((response) => {
  //   console.log(response);
  // });
};

module.exports = {
  getMdlinks, routeExist, pathIsAbsolute, transformAbsolute, verifyDirectory, extensionFile, contentFile, readDir, verifyFile, validate, walkDirectory,
};
