document.getElementById("operaciones_pages").addEventListener("load", () => {
    let script = document.createElement("script")
    script.src = "../js/productos.js"
    script.type = "module"
    document.head.appendChild(script)
})
