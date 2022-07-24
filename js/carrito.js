const encabezadoValores = ['ID', 'Nombre', 'Cantidad', 'Precio Final']
const btnBorrarCarrito = document.getElementById("btnBorrar")
let suma = 0.0;

export function recuperoDatos() {
    return JSON.parse(localStorage.getItem("localLibros")) ?? []
}

function mostrarLibrosComprados() {
    const misLibros = recuperoDatos()
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
            tr.append(th);
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
                tr.append(td);
            }
            cuerpoTabla.append(tr)
        });

        const p = document.createElement("p")
        const seccion = document.querySelector("#productosCarrito div");
        seccion.append(p)
        p.innerText = "El precio total es $" + suma.toFixed(1)

    }
}

btnBorrarCarrito.addEventListener('click', (e) => {
    localStorage.removeItem("localLibros")
}
)

mostrarLibrosComprados()

