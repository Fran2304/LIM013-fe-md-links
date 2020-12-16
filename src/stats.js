/* eslint-disable prefer-template */
const chalk = require('chalk');

// -------stats ----------------
// Esta función retornará cantidad de links totales y cantidad de links únicos
const optionStats = (links) => {
  const totalLinks = links.length;
  // log(chalk.bgBlue.whiteBright('Total:', totalLinks)); *
  const onlyHref = [];
  links.forEach((link) => {
    onlyHref.push(link.href);
  });
  const set1 = new Set(onlyHref);
  const unique = [...set1];
  // log(chalk.bgMagenta.whiteBright('Unique:', unique.length)); *
  // const result = chalk.bgBlue.whiteBright('Total Links:' + totalLinks) + '||' + chalk.bgMagenta.whiteBright('Unique Links: ' + unique.length); **
  const result = `
  ${chalk.bgBlue.whiteBright('Total Links:' + totalLinks)}
  ${chalk.bgMagenta.whiteBright('Unique Links: ' + unique.length)}`;
  return result;
};

// -------stats --Validate ----------------
// Cuando en el cli se pase validate y stats. Recibe promise optionValidate.
// Retorna cantidad total, unique y broken de links.
// Validate: 199 (fail) < 200 (ok) < 400 (fail)
const optionStatsValidate = (links) => {
  const validLinks = [];
  const brokenLinks = [];
  links.forEach((link) => {
    if (link.status >= 200 && link.status <= 400) {
      validLinks.push(link.href);
    } else {
      brokenLinks.push(link.href);
    }
  });
  const result = `
  ${optionStats(links)}
  ${chalk.bgGreenBright.whiteBright('Valid Links:' + validLinks.length)}
  ${chalk.bgRedBright.whiteBright('Broken Links:' + brokenLinks.length)}
  `;
  return result;
};

module.exports = {
  optionStats, optionStatsValidate,
};
