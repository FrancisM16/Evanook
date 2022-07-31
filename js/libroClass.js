export class Libro {
    static IGV = 0.18
    constructor(id, nombre, tipo, importe, imagen) {
        this.id = id
        this.nombre = nombre
        this.tipo = tipo
        this.importe = importe
        this.imagen = imagen
    }
    precioFinal() {
        return parseFloat((this.importe * (Libro.IGV + 1)).toFixed(1))
    }
} 