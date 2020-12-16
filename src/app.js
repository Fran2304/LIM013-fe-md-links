const { getMdlinks, validate } = require('./index.js');

// --------------------------------Md links -------------------
// Esta función debe de retornar  una promesa. Optionvalidate ya retorna promesa.
// Se crea promesa para getMdlinks con Promise. Se usa para ello Promise.resolve
// Este es parecido a  new Promise. Ese utiliza para convertir objetos y promesas extranjeras (thenables) en promesas
const mdlinks = (route, options) => {
  if (options.validate === true) {
    return validate(route);
    // (optionValidate(route)).then((response) => {
    //   console.log(response);
    //   // optionStats(response);
    //   // optionStatsValidate(response);
    // });
    // optionStats(optionValidate(dirAbsolute));
  }
  const getPromise = Promise.resolve(getMdlinks(route)); /// Se usó promise.resolve
  return getPromise;
  // getPromise.then((response) => {
  //   console.log(response);
  //   optionStats(response);
  // });
  // console.log(index.getMdlinks(route));
};

const dirAbsolute = 'D:\\Proyectos\\LIM013-fe-md-links\\example\\dir1';
mdlinks(dirAbsolute, { validate: true });

module.exports = {
  mdlinks,
};
