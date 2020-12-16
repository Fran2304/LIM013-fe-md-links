#! /usr/bin/env node
/* eslint-disable prefer-template */
/* eslint-disable no-shadow */
/* eslint-disable no-tabs */
const path = require('path');

const chalk = require('chalk');

const { mdlinks } = require('./app.js');
const { optionStats, optionStatsValidate } = require('./stats.js');

const { log } = console;

// ********************************************
// console.log(process.argv); // Devuelve array de los comandos que se ingresa. El primero es el path, segundo el href.

// // Definir argumentos: Encontrar argumentos, pues estos pueden cambiar de lugar --validate --stats --stats y --validate

const route = path.normalize(process.argv[2]); // Detecta la ruta

const validateV = process.argv.slice(2).indexOf('--v'); // Detecta --v
const validate = process.argv.slice(2).indexOf('--validate'); // Detecta --validate
const statsS = process.argv.slice(2).indexOf('--s'); // Detecta --stats
const stats = process.argv.slice(2).indexOf('--stats'); // Detecta --stats
const help = process.argv.indexOf('--help');
// Guide
const guide = `
${chalk.bgGreen.whiteBright('***************************How to use md Links?***********************************')}
${'* ' + chalk.blueBright('To get links') + chalk.greenBright(' => ') + 'mdLinks ./some/example.md'}
${chalk.bgMagenta.whiteBright('***************************Options***********************************')}
${'* ' + chalk.blueBright('To get links and status') + chalk.greenBright(' => ') + 'mdLinks ./some/example.md' + chalk.greenBright(' --validate || --v')}
${'* ' + chalk.blueBright('To get statistics (total and unique links)') + chalk.greenBright(' => ') + 'mdLinks ./some/example.md' + chalk.greenBright(' --stats || --s')}
${'* ' + chalk.blueBright('To get statistics (total, unique, broken, valid)') + chalk.greenBright(' => ') + 'mdLinks ./some/example.md' + chalk.greenBright(' --validate --stats || --v --s')}
`;

function cli() {
  console.log(stats, statsS);
  if (help >= 0) { // Si se coloca help
    console.log(guide);
  } else if (route && (validate >= 0 || validateV >= 0) && (stats >= 0 || statsS >= 0)) { // Si se coloca ruta validate y stats
    mdlinks(route, { validate: true }).then((response) => {
      console.log(optionStatsValidate(response));
    });
  } else if ((route && validateV >= 0 && stats <= 0) || (route && validate >= 0 && stats <= 0)) { // Si se coloca ruta y validate
    mdlinks(route, { validate: true }).then((response) => {
      response.forEach((link) => {
        if (link.status >= 200 && link.status <= 400) {
          log(chalk.blueBright(link.file), chalk.magentaBright(link.href), chalk.bgYellowBright.green(link.message, link.status), chalk.whiteBright(link.text));
        } else {
          log(chalk.redBright(link.file, link.href, chalk.bgYellowBright.bold(link.message, link.status), link.text));
        }
      });
    }).catch((error) => {
      console.log(error);
    });
  } else if ((route && validate <= 0 && stats) || (route && validate <= 0 && statsS)) { // Si se coloca ruta y stats
    mdlinks(route, { validate: false }).then((response) => {
      console.log(optionStats(response));
    });
  } else if (route && (validate <= 0 || validateV <= 0) && (stats <= 0 || statsS <= 0)) { // Si se coloca solo ruta
    mdlinks(route, { validate: false }).then((response) => {
      response.forEach((link) => {
        log(chalk.greenBright(link.file), chalk.magentaBright(link.href), chalk.white(link.text));
      });
    });
  }
}

cli();
