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
            const filaTabla = document.createElement("tr")
            let precio = parseFloat((libro.precio * libro.cantidad))
            let precioLibros = precio.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
            const valores = [libro.id, libro.titulo, libro.cantidad, "$" + precioLibros]
            suma += precio

            valores.forEach((valor) => {
                const filaDato = document.createElement("td")
                filaDato.innerText = valor
                filaTabla.append(filaDato)
            })

            const botonBorrar = document.createElement("td")
            botonBorrar.innerHTML = '<i class="fa fa-trash botonBorrar"></i>'
            eliminarLibro(botonBorrar, misLibros, libro)
            filaTabla.append(botonBorrar)
            cuerpoTabla.append(filaTabla)
        })

        const precio = document.querySelector("#precio")
        const precioFinal = suma.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
        precio.innerHTML = `<p>El precio total es $${precioFinal}</p>`

        const botones = document.querySelector("#botones");
        botones.innerHTML = `<button class="boton" id="botonConfirmar"> Confirmar compra </button>
                            <button class="btn shadow-none m-2" id="botonLimpiar"> Limpiar </button>`

        botonLimpiar.addEventListener("click", () => {
            localStorage.removeItem("localLibros")
            location.reload()
        });

        botonConfirmar.addEventListener("click", () => {
            crearModalConfirmacion(precioFinal)
        })
    }
}

const eliminarLibro = (botonBorrar, misLibros, libro) => {
    botonBorrar.addEventListener("click", () => {
        misLibros = misLibros.filter(lib => lib.id != libro.id)
        let str = JSON.stringify(misLibros)
        localStorage.setItem("localLibros", str)
        location.reload()
    })
}

const crearModalConfirmacion = (precioFinal) => {
    Swal.fire({
        title: "Confirmar compra",
        text: "¿Deseas pagar $" + precioFinal + " por tus libros?",
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
                footer: '<a href="../" class="botonFooter">Seguir comprando</a>',
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
