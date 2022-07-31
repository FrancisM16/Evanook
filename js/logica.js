const filtrarLibro = () => {
    const botonesFiltro = document.querySelectorAll("#filtros .btn")
    botonesFiltro.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            e.preventDefault()
            const filtro = e.target.dataset.filter
            boton.classList.add("boton__active")
            const tiendaLibros = document.querySelectorAll(".libro")
            tiendaLibros.forEach((libro) => {
                if (filtro === 'todo') {
                    libro.style.display = 'block'
                    return
                }
                if (libro.classList.contains(filtro)) {
                    libro.style.display = 'block'
                    return
                }
                libro.style.display = 'none'
            })
            activarFiltro(filtro, botonesFiltro)
        })
    })
}

const activarFiltro = (filtro, botonesFiltro) => {
    botonesFiltro.forEach((boton) => {
        filtro.toUpperCase() == boton.innerText.toUpperCase()
            ? boton.classList.add("boton__active")
            : boton.classList.remove("boton__active")
    })
}

export const agregarCarrito = (librosTotales) => {
    const botonesTarjeta = document.querySelectorAll(".card-body button")
    botonesTarjeta.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            e.preventDefault()
            const id = parseInt(e.target
                .parentNode
                .dataset
                .libro)
            const libroSeleccionado = librosTotales.find(libro => libro.id === id)
            guardarDatos(libroSeleccionado)
            mostrarToaster(libroSeleccionado)
        })
    })
}

const mostrarToaster = (libroSeleccionado) => {
    Toastify({
        text: `"${libroSeleccionado.nombre}" fue agregado al carrito`,
        duration: 2000,
        gravity: 'bottom',
        position: 'right',
        style: {
            background: '#dd2471'
        }
    }).showToast()
}

const guardarDatos = (libroSeleccionado) => {
    const { id, nombre } = libroSeleccionado
    const libro = {
        id: id,
        titulo: nombre,
        precio: libroSeleccionado.precioFinal(),
        cantidad: 1
    }
    let localLibros = JSON.parse(localStorage.getItem("localLibros")) ?? []
    confirmarLibroExiste(libro, localLibros)
    let str = JSON.stringify(localLibros)
    localStorage.setItem("localLibros", str)
}

const confirmarLibroExiste = (libro, localLibros) => {
    let libroExiste = localLibros.find(lib => lib.id === libro.id)
    if (libroExiste) {
        libroExiste.cantidad++
        localLibros = localLibros.map(lib => {
            lib.id === libro.id && libroExiste
            return lib
        })
    } else {
        localLibros.push(libro)
    }
}

filtrarLibro()

