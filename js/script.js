DATA_URL = 'https://japceibal.github.io/japflix_api/movies-data.json'; //vínculo API
let listado = document.getElementById ("lista");
let catalogoPeliculas = "";

function Peliculas (data){
  catalogoPeliculas = data;
  return catalogoPeliculas;
}

function respuesta (response) {
  return response.json();
}

function datos (DATA_URL) {
  return Peliculas (DATA_URL);
}

function esError(error){
  console.error ("Ocurrió error", error);
}

function cargarPeliculas () {
    fetch(DATA_URL)
    .then(respuesta)
    .then(datos)
    .catch(esError);
}

cargarPeliculas(); //Función para cargar la información de la API en la variable catalogoPeliculas

//funcion para mostrar peliculas
function showPelicula (film){ 
      let elemento = document.createElement('div');
      let estrellas = '★'.repeat(film.vote_average) + '☆'.repeat(10 - film.vote_average);
      elemento.innerHTML = `
      <h2>${film.title}</h2>
      <p>${film.tagline}</p>
      <p>Rating: ${estrellas}</p>
      <hr>`;
      listado.appendChild(elemento);
      elemento.addEventListener('click', () => {
      showDetalles(film);
      });
}

//función para buscar pelicula en función de lo ingresado en el campo del input
function buscar (){
  buscando = campoBusqueda.value != "";
  if (buscando) {
    listado.innerHTML = '';
    for (let pelicula of catalogoPeliculas){      
      if (pelicula.title.toLowerCase().includes(campoBusqueda.value.toLowerCase())){
        showPelicula(pelicula);
      }
    }
  }

}

let buscando = false;
let campoBusqueda = document.getElementById("inputBuscar");
let botonBuscar = document.getElementById("btnBuscar");
botonBuscar.addEventListener("click", buscar);

//funcion para mostrar los detalles adicionales
function showDetalles (film) {
  let detalles = document.getElementById('detallesPelicula');
  detalles.innerHTML = '';
  let genero = film.genres.map(genero => genero.name).join(', ');
  detalles.innerHTML = `
  <div class="detallesHeader">
  <button id="cerrarDetalles" class="detallesButton">✖</button>
      <h2>${film.title}</h2>
      
  </div>
  <p>${film.overview}</p>
  <p><strong>Géneros:</strong> ${genero}</p>

  <div class="dropdown">
  <button class="dropbtn" id="toggleDetalles" >More</button>
  <div id="additionalInfo" class="dropdown-content" style="display: none;">
   <div class="infoContainer">
    <h3 class="addInfoHeading">Año de lanzamiento:</h3>
          <p class="addInfoData">${film.release_date.split('-')[0]}</p>
          <h3 class="addInfoHeading">Duración:</h3>
          <p class="addInfoData">${film.runtime} minutos</p>
          <h3 class="addInfoHeading">Presupuesto:</h3>
          <p class="addInfoData">${film.budget.toLocaleString()}</p>
          <h3 class="addInfoHeading">Ganancias:</h3>
          <p class="addInfoData">${film.revenue.toLocaleString()}</p>
      </div>
  </div>
</div>
`;

let botonMore = document.getElementById('toggleDetalles');
let botonCerrar = document.getElementById('cerrarDetalles');
let infoAdicional = document.getElementById('additionalInfo');

//función para agregar evento al boton de "more"
botonMore.addEventListener ('click', () => {
    if (infoAdicional.style.display === 'none') {
      infoAdicional.style.display = 'block';
      botonMore.innerHTML = "✖";
    } else {
      infoAdicional.style.display = 'none';
      botonMore.innerHTML = 'more';
    }
 });
 
 //función para agregar evento al boton de "cerrar"
 botonCerrar.addEventListener('click', () => {
  detalles.style.display = 'none';
});

detalles.style.display = 'block';

}

