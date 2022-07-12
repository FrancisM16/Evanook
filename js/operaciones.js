import { Libro } from "./libroClass.js"
const URL = `js/datos.json`
export const librosTotales = []

function crearTarjetas(data) {
    const libros = document.getElementById("libros");
    data.forEach((data) => {
        const libro = new Libro(data.id, data.nombre, data.tipo, data.importe, data.imagen)
        librosTotales.push(libro)
        const { id, nombre, tipo, imagen } = libro
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
                            </div>`
    });
}

const obtenerContenido = (URL) => {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            crearTarjetas(data)
        })
}

obtenerContenido(URL)