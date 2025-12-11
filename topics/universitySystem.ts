export interface IRecurso {
    id: number;
    nombre: string;
    tipo: string;
}

export abstract class RecursoBase implements IRecurso {
    id: number;
    nombre: string;
    tipo: string;

    constructor(id: number, nombre: string, tipo: string) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
    }
}

export class Libro extends RecursoBase {
    autor: string;
    paginas: number;

    constructor(id: number, nombre: string, autor: string, paginas: number) {
        super(id, nombre, "Libro");
        this.autor = autor;
        this.paginas = paginas;
    }
}

export class Articulo extends RecursoBase {
    autor: string;
    anio: number;

    constructor(id: number, nombre: string, autor: string, anio: number) {
        super(id, nombre, "Artículo");
        this.autor = autor;
        this.anio = anio;
    }
}

export class UniversitySystem {
    private recursos: RecursoBase[] = [];

    agregarRecurso(r: RecursoBase): void {
        this.recursos.push(r);
    }

    obtenerRecursos(): RecursoBase[] {
        return this.recursos;
    }

    buscarRecurso(id: number): RecursoBase | undefined {
        return this.recursos.find(r => r.id === id);
    }

    eliminarRecurso(id: number): void {
        this.recursos = this.recursos.filter(r => r.id !== id);
    }

    actualizarRecurso(
        id: number,
        datos: { nombre?: string; autor?: string; anio?: number; paginas?: number }
    ): void {
        const r = this.buscarRecurso(id);
        if (!r) return;

        if (datos.nombre) r.nombre = datos.nombre;

        if (r instanceof Libro) {
            if (datos.autor !== undefined) r.autor = datos.autor;
            if (datos.paginas !== undefined) r.paginas = datos.paginas;
        }

        if (r instanceof Articulo) {
            if (datos.autor !== undefined) r.autor = datos.autor;
            if (datos.anio !== undefined) r.anio = datos.anio;
        }
    }

    buscarRecursos(query: string): RecursoBase[] {
        const q = query.toLowerCase().trim();
        if (q === "") return this.recursos;

        return this.recursos.filter(r => {
            if (r.nombre.toLowerCase().includes(q)) return true;

            if (r instanceof Libro) {
                if (r.autor.toLowerCase().includes(q)) return true;
                if (r.paginas.toString().includes(q)) return true;
            }

            if (r instanceof Articulo) {
                if (r.autor.toLowerCase().includes(q)) return true;
                if (r.anio.toString().includes(q)) return true;
            }

            return false;
        });
    }
}
