/// =========================================================================== ///
/// =============================== HENRY-FLIX ================================ ///
/// =========================================================================== ///

'use strict';

const categories = ['regular', 'premium'];

let users = [];
let series = [];

module.exports = {
  reset: function () {
    // No es necesario modificar esta función. La usamos para "limpiar" los arreglos entre test y test.

    users = [];
    series = [];
  },

  // ==== COMPLETAR LAS SIGUIENTES FUNCIONES (vean los test de `model.js`) =====

  addUser: function (email, name) {
    // Agrega un nuevo usuario, verificando que no exista anteriormente en base a su email.
    // En caso de existir, no se agrega y debe arrojar el Error ('El usuario ya existe') >> ver JS throw Error
    // Debe tener una propiedad <plan> que inicialmente debe ser 'regular'.
    // Debe tener una propiedad <watched> que inicialmente es un array vacío.
    // El usuario debe guardarse como un objeto con el siguiente formato:
    // {  email: email, name: name,  plan: 'regular' , watched: []}
    // En caso exitoso debe retornar el string 'Usuario <email_del_usuario> creado correctamente'.

    //if (users.some((el) => el.email === email))throw Error('El usuario ya existe'); 
    //some recorre el array y devuelve true o false 
    //dependiendo si al menos un elemento del array cumple con la condición implementada por la función proporcionada. 

    users.forEach(e => {if(e.email == email) throw Error ('El usuario ya existe')});
    let user = {
      email,
      name,
      plan:'regular',
      watchet:[] 
    };
    users.push(user);
    return `Usuario ${email} creado correctamente`;
  },

  listUsers: function (plan) {
    // Si no recibe parámetro, devuelve un arreglo con todos los usuarios.
    // En caso de recibir el parámetro <plan>, devuelve sólo los usuarios correspondientes a dicho plan ('regular' o 'premium').
    if (!plan) return users
    return users.filter(p => p.plan === plan);
  },

  switchPlan: function (email) {
    // Alterna el plan del usuario: si es 'regular' lo convierte a 'premium' y viceversa.
    // Retorna el mensaje '<Nombre_de_usuario>, ahora tienes el plan <nuevo_plan>'
    // Ej: 'Martu, ahora tienes el plan premium'
    // Si el usuario no existe, arroja el Error ('Usuario inexistente')
    if(!users.some(e => e.email === email)) throw Error ("Usuario inexistente")
    let user = ''
    users.forEach(e=>{
      if (e.email === email) {
        if (e.plan === 'regular')e.plan = 'premium';
        else e.plan = 'regular';
        user = `${e.name}, ahora tienes el plan ${e.plan}`;
      };
    });
    return user
  },

  addSerie: function (name, seasons, category, year) {
    // Agrega una nueva serie al catálogo.
    // Si la serie ya existe, no la agrega y arroja un Error ('La serie <nombre_de_la_serie> ya existe')
    // Si la categoría no existe, arroja un Error ('La categoría <nombre_de_la_categoría> no existe') y no agrega la serie.
    // Debe devolver el mensaje 'La serie <nombre de la serie> fue agregada correctamente'
    // Debe guardar la propiedad <category> de la serie (regular o premium)
    // Debe guardar la propiedade <rating> inicializada 0
    // Debe guardar la propiedade <reviews> que incialmente es un array vacío.
    // console.log(name, seasons, category, year, '**** datos de entrada****')
    // console.log(name, '**** datos de entrada****')
    // console.log(seasons, '**** datos de entrada****')
    // console.log(category, '**** datos de entrada****')
    // console.log(year, '**** datos de entrada****')
    
    if (series.find(e => e.name === name)) throw Error(`La serie ${name} ya existe`);
    if (!categories.some((el) => el === category)) throw Error(`La categoría ${category} no existe`);

    let addNewSerie = {
      name,
      seasons,
      category,
      year,
      rating: 0,
      reviews: []
    };
    series.push(addNewSerie);
    return `La serie ${name} fue agregada correctamente`
  },

  listSeries: function (category) {
    // Devuelve un arreglo con todas las series.
    // Si recibe una categoría como parámetro, debe filtrar sólo las series pertenecientes a la misma (regular o premium).
    // Si la categoría no existe, arroja un Error ('La categoría <nombre_de_la_categoría> no existe') y no agrega la serie.

    if (!category) return series;
    if (categories.some((el) => el === category)) return series.filter(e => e.category === category)
    throw Error(`La categoría ${category} no existe`)
  },

  play: function (serie, email) {
    // Con esta función, se emula que el usuario comienza a reproducir una serie.
    // Si el usuario no existe, arroja el Error ('Usuario inexistente')
    // Si la serie no existe, arroja el Error ('Serie inexistente')
    // Debe validar que la serie esté disponible según su plan. Usuarios con plan regular sólo pueden reproducir series de dicha categoría, usuario premium puede reproducir todo.
    // En caso de contrario arrojar el Error ('Contenido no disponible, contrata ahora HenryFlix Premium!')
    // En caso exitoso, añadir el nombre (solo el nombre) de la serie a la propiedad <watched> del usuario.
    // Devuelve un mensaje con el formato: 'Reproduciendo <nombre de serie>'
    
    if(!users.some(e => e.email === email)) throw Error ("Usuario inexistente")
    if(!series.some(e => e.name === serie)) throw Error('Serie inexistente');
    let userPlan = users.find(e => e.email === email);
    let seriePlan = series.find(e => e.name === serie);
    if(userPlan.plan !== 'premium' && seriePlan.category === 'premium')  throw Error('Contenido no disponible, contrata ahora HenryFlix Premium!');

  },

  watchAgain: function (email) {
    // Devuelve sólo las series ya vistas por el usuario
    // Si el usuario no existe, arroja el Error ('Usuario inexistente')
  },

  rateSerie: function (serie, email, score) {
    // Asigna un puntaje de un usuario para una serie:
    // Actualiza la propiedad <reviews> de la serie, guardando en dicho arreglo un objeto con el formato { email : email, score : score } (ver examples.json)
    // Actualiza la propiedad <rating> de la serie, que debe ser un promedio de todos los puntajes recibidos.
    // Devuelve el mensaje 'Le has dado <puntaje> puntos a la serie <nombre_de_la_serie>'
    // Si el usuario no existe, arroja el Error ('Usuario inexistente') y no actualiza el puntaje.
    // Si la serie no existe, arroja el Error ('Serie inexistente') y no actualiza el puntaje.
    // Debe recibir un puntaje entre 1 y 5 inclusive. En caso contrario arroja el Error ('Puntaje inválido') y no actualiza el puntaje.
    // Si el usuario no reprodujo la serie, arroja el Error ('Debes reproducir el contenido para poder puntuarlo') y no actualiza el puntaje. >> Hint: pueden usar la función anterior
  },
};
