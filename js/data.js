import { Libro } from "./libroClass.js"
let id = 0
export const libros = generadorAutomatico()

function crearID() {
    return ++id
}

function generadorAutomatico() {
    const libros = []
    libros.push(new Libro(crearID(), "Roma soy yo", "fantasia", 50))
    libros.push(new Libro(crearID(), "Aventuras de S.H", "fantasia", 60))
    libros.push(new Libro(crearID(), "Ciudad medialuna", "juvenil", 80))
    libros.push(new Libro(crearID(), "Fleur", "juvenil", 70))
    libros.push(new Libro(crearID(), "Gravity Falls", "infantil", 30))
    libros.push(new Libro(crearID(), "El Principito", "infantil", 40))
    return libros
}