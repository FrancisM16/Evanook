const encabezadoValores = ['ID', 'Nombre', 'Cant', 'Precio Final', 'Acciones']
const tabla = document.querySelector("table")
let suma = 0.0

function mostrarLibrosComprados() {
    let misLibros = JSON.parse(localStorage.getItem("localLibros")) ?? []
    if (misLibros.length > 0) {
        const encabezadoTabla = document.querySelector("thead")
        encabezadoTabla.innerHTML = ""

        const cuerpoTabla = document.querySelector("tbody")
        cuerpoTabla.innerHTML = ""

        let titulo = document.getElementById("titulo")
        let bajada = document.getElementById("bajada")
        titulo.innerText = "Libros comprados "
        bajada.innerText = "Estos son tus libros: "

        const tr = document.createElement("tr")
        for (const encabezado of encabezadoValores) {
            const th = document.createElement("th")
            th.innerText = encabezado
            th.id = encabezado + "en"
            tr.append(th)
        }
        encabezadoTabla.append(tr)

        misLibros.forEach((libro) => {
            const tr = document.createElement("tr")
            let precio = parseFloat((libro.precio * libro.cantidad).toFixed(1))
            const valores = [libro.id, libro.titulo, libro.cantidad, "$" + precio]
            suma += precio
            for (const valor of valores) {
                const td = document.createElement("td")
                td.innerText = valor
                tr.append(td)
            }
            const td = document.createElement("td")
            td.innerHTML = '<i class="fa fa-trash botonBorrar"></i>'
            td.addEventListener("click", () => {
                misLibros = misLibros.filter(lib => lib.id != libro.id)
                let str = JSON.stringify(misLibros)
                localStorage.setItem("localLibros", str)
                location.reload()
            })
            tr.append(td)
            cuerpoTabla.append(tr)
        })

        const p = document.createElement("p")
        const seccion = document.querySelector("#productosCarrito div #precio")
        seccion.append(p)
        p.innerText = "El precio total es $" + suma.toFixed(1)

        const botones = document.getElementById("botones");
        botones.innerHTML = `<button class="boton" id="botonConfirmar"> Confirmar compra </button>
                            <button class="btn shadow-none m-2" id="botonLimpiar"> Limpiar </button>`

        botonLimpiar.addEventListener("click", () => {
            localStorage.removeItem("localLibros")
            location.reload()
        });

        botonConfirmar.addEventListener("click", () => {
            Swal.fire({
                title: 'Confirmar compra',
                text: "¿Deseas pagar $" + suma.toFixed(1) + " por tus libros?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#000000',
                customClass: {
                    cancelButton: 'btn',
                    confirmButton: 'boton'
                },
                showCloseButton: true,
                cancelButtonText: 'No, cancelar',
                confirmButtonText: 'Sí, pagar',
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("localLibros")
                    Swal.fire({
                        title: '¡Pago exitoso!',
                        text: "En los próximos días se te enviará tu pedido",
                        footer: '<a href="../index.html" class="botonFooter">Seguir comprando</a>',
                        customClass: {
                            confirmButton: 'boton',
                        },
                        icon: 'success',
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload()
                        }
                    })
                }
            })
        })



    }
}


mostrarLibrosComprados()

