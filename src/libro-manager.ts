// libro-manager.ts
export interface Libro {
    id: string;
    nombre: string;
    categoria: string;
    paginas: number;
}

export class LibroManager {
    private libros: Libro[] = [];
    private storageKey = "librosData";

    constructor() {
        this.cargarDesdeStorage();
    }

    private guardarEnStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.libros));
    }

    private cargarDesdeStorage() {
        const data = localStorage.getItem(this.storageKey);
        if (data) {
            this.libros = JSON.parse(data);
        }
    }

    obtenerLibros(): Libro[] {
        return this.libros;
    }

    agregarLibro(nombre: string, categoria: string, paginas: number) {
        const nuevo: Libro = {
            id: crypto.randomUUID(),
            nombre,
            categoria,
            paginas
        };
        this.libros.push(nuevo);
        this.guardarEnStorage();
    }

    actualizarLibro(id: string, nombre: string, categoria: string, paginas: number) {
        const libro = this.libros.find(l => l.id === id);
        if (libro) {
            libro.nombre = nombre;
            libro.categoria = categoria;
            libro.paginas = paginas;
            this.guardarEnStorage();
        }
    }

    eliminarLibro(id: string) {
        this.libros = this.libros.filter(l => l.id !== id);
        this.guardarEnStorage();
    }

    buscar(texto: string): Libro[] {
        const t = texto.toLowerCase();
        return this.libros.filter(l =>
            l.nombre.toLowerCase().includes(t) ||
            l.categoria.toLowerCase().includes(t)
        );
    }
}
