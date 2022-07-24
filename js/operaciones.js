import { Libro } from "./libroClass.js";
import { addButtonsActions } from "./productos.js";

let URL = "../datos.json";
export const librosTotales = [];

// TODO: Is necessary?
// if (window.location.origin == "https://francism16.github.io") {
//   URL = "https://francism16.github.io/Evanook/datos.json";
// } else {
//   URL = "http://127.0.0.1:5501/datos.json";
// }

console.log(URL);

function obtenerLibrosFiltrados(data, ubicacion) {
  switch (ubicacion) {
    case "index":
      return data.filter((lib) => lib.destacado == true);
    case "fantasia":
      return data.filter((lib) => lib.tipo == "fantasia");
    case "infantil":
      return data.filter((lib) => lib.tipo == "infantil");
    case "juvenil":
      return data.filter((lib) => lib.tipo == "juvenil");
    default:
      return data;
  }
}

function filtrarTarjetas(data, ubicacion) {
  const libros = document.getElementById("libros");
  const librosFiltrados = obtenerLibrosFiltrados(data, ubicacion);
  crearTarjetas(librosFiltrados, libros);
}

function crearTarjetas(data, libros) {
  data.forEach((data) => {
    const libro = new Libro(
      data.id,
      data.nombre,
      data.tipo,
      data.importe,
      data.imagen
    );
    librosTotales.push(libro);
    const { id, nombre, tipo, imagen } = libro;
    libros.innerHTML += `<div class="libro ${tipo} col-md-3">
                                <div class="card border-0 shadow-sm">
                                    <div class="card-body" data-libro="${id}">
                                        <img src="${imagen}" alt="libro${id}">
                                        <div class="m-4">
                                            <h4 class="card__title">${nombre}</h4>
                                            <h5 class="card__price">$${libro.precioFinal()}</h5>
                                        </div>
                                    <button class="boton" id="liveToastBtn">Agregar 
                                            <i class="fa fa-shopping-cart"></i>
                                    </button>
                                    </div>
                                </div>
                            </div>`;
  });

  addButtonsActions();
}

const obtenerOrigenUrl = (ruta) => {
  if (ruta.includes("index")) {
    return "index";
  }
  if (ruta.includes("fantasia")) {
    return "fantasia";
  }
  if (ruta.includes("infantil")) {
    return "infantil";
  }
  if (ruta.includes("juvenil")) {
    return "juvenil";
  }
  return "index";
};

const obtenerContenido = (URL) => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      const ruta = window.location.pathname;
      const ubicacion = obtenerOrigenUrl(ruta);
      filtrarTarjetas(data, ubicacion);
    })
    .catch((e) => {
      console.log({ e });
    });
};

obtenerContenido(URL);
