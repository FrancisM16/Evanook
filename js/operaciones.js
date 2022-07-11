import { libros } from "./data.js"
const librosTotales = libros

function crearTarjetas() {
    const libros = document.getElementById("libros");
    librosTotales.forEach((libro) => {
        const div1 = document.createElement("div")
        div1.classList.add("libro", `${libro.tipo}`, "col-md-3")

        const div2 = document.createElement("div")
        div1.append(div2)
        div2.classList.add("card", "border-0", "shadow-sm")

        const div3 = document.createElement("div")
        div2.append(div3)
        div3.classList.add("card-body")
        div3.setAttribute("data-libro", `${libro.id}`)

        const img = document.createElement("img")
        div3.append(img)
        img.setAttribute("src", `images/libro${libro.id}.jpg`)
        img.setAttribute("alt", `libro${libro.id}`)

        const div4 = document.createElement("div")
        div3.append(div4)
        div4.classList.add("m-4")
        const h4 = document.createElement("h4")
        h4.classList.add("card__title")
        h4.innerText = `${libro.nombre}`
        div4.append(h4)
        const h5 = document.createElement("h5")
        h5.classList.add("card__price")
        h5.innerText = `$${libro.precioFinal()}`
        div4.append(h5)

        const button = document.createElement("button")
        div3.append(button)
        button.classList.add("boton")
        button.setAttribute("id", "liveToastBtn")
        button.innerText = "Agregar "
        const i = document.createElement("i")
        button.append(i)
        i.classList.add("fa", "fa-shopping-cart")

        libros.append(div1)

    });
}

crearTarjetas()
