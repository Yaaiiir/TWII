// src/Topist/Book.ts

// ---------------------------------------------------
// 1. INTERFACE (IpBook) - Contrato de datos
export interface IpBook {
    id: number; 
    nombre: string;
    categoria: string;
    paginas: number; 
}
// ---------------------------------------------------

// 2. CLASE (Libro) - Implementación del objeto
export class Libro implements IpBook {
    public readonly id: number; 
    public nombre: string;
    public categoria: string;
    public paginas: number;

    constructor(
        nombre: string,
        categoria: string,
        paginas: number,
        idAsignado: number 
    ) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.paginas = paginas;
        this.id = idAsignado; 
    }
}