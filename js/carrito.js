const encabezadoValores = ["ID", "Nombre", "Cant", "Precio Final", "Acciones"]
let suma = 0.0
const mostrarLibrosComprados = () => {
    let misLibros = JSON.parse(localStorage.getItem("localLibros")) ?? []
    if (misLibros.length > 0) {
        const encabezadoTabla = document.querySelector("thead tr")
        const cuerpoTabla = document.querySelector("tbody")
        const titulos = document.querySelector("#titulos")
        titulos.innerHTML = "<h5>Libros comprados</h5> <p>Estos son tus libros:</p>"

        encabezadoValores.forEach((encabezado) => {
            encabezadoTabla.innerHTML += `<th id="${encabezado}">${encabezado}</th>`
        })

        misLibros.forEach((libro) => {
            let precio = parseFloat((libro.precio * libro.cantidad).toFixed(1))
            suma += precio
            cuerpoTabla.innerHTML += `<tr data-libro="${libro.id}">
                                            <td>${libro.id}</td>
                                            <td>${libro.titulo}</td>
                                            <td>${libro.cantidad}</td>
                                            <td>$${precio}</td>
                                            <td class="borrar"><i class="fa fa-trash botonBorrar"></i></td>
                                    </tr>`
        })
        eliminarLibro(misLibros)

        const precio = document.querySelector("#precio")
        precio.innerHTML = `<p>El precio total es $${suma.toFixed(1)}</p>`

        const botones = document.querySelector("#botones");
        botones.innerHTML = `<button class="boton" id="botonConfirmar"> Confirmar compra </button>
                            <button class="btn shadow-none m-2" id="botonLimpiar"> Limpiar </button>`

        botonLimpiar.addEventListener("click", () => {
            localStorage.removeItem("localLibros")
            location.reload()
        });

        botonConfirmar.addEventListener("click", () => {
            crearModalConfirmacion()
        })
    }
}

const eliminarLibro = (misLibros) => {
    const botonBorrar = document.querySelectorAll(".borrar")
    botonBorrar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            e.preventDefault()
            const id = parseInt(e.target
                .parentNode
                .parentNode
                .dataset
                .libro)
            misLibros = misLibros.filter(lib => lib.id != id)
            let str = JSON.stringify(misLibros)
            localStorage.setItem("localLibros", str)
            location.reload()
        })
    })
}

const crearModalConfirmacion = () => {
    Swal.fire({
        title: "Confirmar compra",
        text: "¿Deseas pagar $" + suma.toFixed(1) + " por tus libros?",
        icon: "question",
        showCancelButton: true,
        customClass: {
            cancelButton: "btn",
            confirmButton: "boton",
            closeButton: "botonCerrar"
        },
        showCloseButton: true,
        cancelButtonText: "No, cancelar",
        confirmButtonText: "Sí, pagar",
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("localLibros")
            const carrito = document.querySelector("#carrito")
            carrito.innerHTML = ''
            Swal.fire({
                title: "¡Pago exitoso!",
                text: "En los próximos días se te enviará tu pedido",
                footer: '<a href="../index.html" class="botonFooter">Seguir comprando</a>',
                customClass: {
                    confirmButton: "boton",
                },
                icon: "success",
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload()
                }
            })
        }
    })
}

mostrarLibrosComprados()
