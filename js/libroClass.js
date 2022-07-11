export class Libro {
    static IGV = 0.18
    constructor(id, nombre, tipo, importe) {
        this.id = id
        this.nombre = nombre
        this.tipo = tipo
        this.importe = importe
    }
    precioFinal() {
        return parseFloat((this.importe * (Libro.IGV + 1)).toFixed(1))
    }
} 