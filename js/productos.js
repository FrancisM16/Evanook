export const addButtonsActions = (librosTotales) => {
    const btns = document.querySelectorAll("#filters .btn");
    const tiendaLibros = document.querySelectorAll(".libro");
    const btnsCard = document.querySelectorAll(".card-body button");

    btns.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            const filter = e.target.dataset.filter;
            button.classList.add("boton__active")
            tiendaLibros.forEach((libro) => {
                if (filter === 'todo') {
                    libro.style.display = 'block'
                    return
                }
                if (libro.classList.contains(filter)) {
                    libro.style.display = 'block'
                    return
                }
                libro.style.display = 'none'
            });
            filterLibro(filter)
        });
    });

    function filterLibro(value) {
        btns.forEach((button) => {
            if (value.toUpperCase() == button.innerText.toUpperCase()) {
                button.classList.add("boton__active")
                return
            }
            button.classList.remove("boton__active");
        });
    }

    btnsCard.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            const id = parseInt(e.target
                .parentNode
                .dataset
                .libro)
            const libroSeleccionado = librosTotales.find(libro => libro.id === id)
            guardarDatos(libroSeleccionado)
            Toastify({
                text: `"${libroSeleccionado.nombre}" fue agregado al carrito`,
                duration: 2000,
                gravity: 'bottom',
                position: 'right',
                style: {
                    background: '#dd2471'
                }
            }).showToast();
        });
    });

    function guardarDatos(libroSeleccionado) {
        const { id, nombre } = libroSeleccionado
        const libro = {
            id: id,
            titulo: nombre,
            precio: libroSeleccionado.precioFinal(),
            cantidad: 1
        }
        let localLibros = JSON.parse(localStorage.getItem("localLibros")) ?? []

        let libroExist = localLibros.find(lib => lib.id === libro.id)
        if (libroExist) {
            libroExist.cantidad++
            localLibros = localLibros.map(lib => {
                lib.id === libro.id && libroExist
                return lib
            })
        } else {
            localLibros.push(libro)
        }
        let str = JSON.stringify(localLibros)
        localStorage.setItem("localLibros", str)
    }
};



