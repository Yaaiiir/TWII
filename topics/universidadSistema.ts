//En esta parte se escribira el codigo para crear un sistema universitario sencillo y practico.
// 1. INTERFACES BASE
interface Curso { 
    codigo: string; 
    nombre: string; 
    creditos: number; 
}
interface Estudiante { 
    id: number; 
    nombre: string; 
    edad: number; 
    cursos: Curso[]; 
}
// 2. CLASES Y HERENCIA PARA RECURSOS
class RecursoBase {
    public id: number;
    public nombre: string;
    public tipo: 'Libro' | 'Articulo' | 'Video';

    constructor(id: number, nombre: string, tipo: 'Libro' | 'Articulo' | 'Video') {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
    }
}
class Libro extends RecursoBase {
    public autor: string;

    constructor(id: number, nombre: string, autor: string) {
        super(id, nombre, 'Libro');
        this.autor = autor;
    }
}
// 3. SISTEMA UNIVERSITARIO (CRUD COMPLETO)
class SistemaUniversitario {
    private estudiantes: Estudiante[] = [];
    private recursos: RecursoBase[] = [];
    private proximoIdEstudiante = 1;
    private proximoIdRecurso = 1;
    // ---------- CRUD ESTUDIANTES ----------
    // CREATE
    public agregarEstudiante(nombre: string, edad: number): Estudiante {
        const nuevoEstudiante: Estudiante = {
            id: this.proximoIdEstudiante++,
            nombre,
            edad,
            cursos: []
        };
        this.estudiantes.push(nuevoEstudiante);
        return nuevoEstudiante;
    }
    // READ
    public obtenerEstudiantes(): Estudiante[] {
        return this.estudiantes;
    }
    public obtenerEstudiantePorId(id: number): Estudiante | undefined {
        return this.estudiantes.find(e => e.id === id);
    }
    // UPDATE
    public actualizarEstudiante(id: number, nombre?: string, edad?: number): boolean {
        const estudiante = this.obtenerEstudiantePorId(id);
        if (!estudiante) return false;

        if (nombre) estudiante.nombre = nombre;
        if (edad) estudiante.edad = edad;

        return true;
    }
    // DELETE
    public eliminarEstudiante(id: number): boolean {
        const indice = this.estudiantes.findIndex(e => e.id === id);
        if (indice === -1) return false;

        this.estudiantes.splice(indice, 1);
        return true;
    }
    // ---------- CRUD RECURSOS (con clases e herencia) ----------
    // CREATE
    public agregarRecursoLibro(nombre: string, autor: string): Libro {
        const nuevoLibro = new Libro(this.proximoIdRecurso++, nombre, autor);
        this.recursos.push(nuevoLibro);
        return nuevoLibro;
    }
    // READ
    public obtenerTodosLosRecursos(): RecursoBase[] {
        return this.recursos;
    }
    public buscarRecursos(criterio: string): RecursoBase[] {
        const criterioLower = criterio.toLowerCase();

        if (criterioLower === 'libro' || criterioLower === 'articulo' || criterioLower === 'video') {
            return this.recursos.filter(r => r.tipo.toLowerCase() === criterioLower);
        }

        return this.recursos.filter(r =>
            r.nombre.toLowerCase().includes(criterioLower)
        );
    }
    // UPDATE
    public actualizarRecurso(id: number, nuevoNombre?: string): boolean {
        const recurso = this.recursos.find(r => r.id === id);
        if (!recurso) return false;

        if (nuevoNombre) recurso.nombre = nuevoNombre;

        return true;
    }

    // DELETE
    public eliminarRecurso(id: number): boolean {
        const indice = this.recursos.findIndex(r => r.id === id);
        if (indice === -1) return false;

        this.recursos.splice(indice, 1);
        return true;
    }
}
// ------------------ PRUEBAS ------------------
const sistema = new SistemaUniversitario();
// Crear
const e1 = sistema.agregarEstudiante("Melissa", 20);
const e2 = sistema.agregarEstudiante("Juan", 22);
sistema.agregarRecursoLibro("Cien Años de Soledad", "García Márquez");
sistema.agregarRecursoLibro("Patrones de Diseño", "Erich Gamma");
// Actualizar
sistema.actualizarEstudiante(e1.id, "Melissa V.", 21);
sistema.actualizarRecurso(1, "Cien Años de Soledad (Edición Especial)");
// Eliminar
sistema.eliminarEstudiante(e2.id);
sistema.eliminarRecurso(2);
console.log("Estudiantes:", sistema.obtenerEstudiantes());
console.log("Recursos:", sistema.obtenerTodosLosRecursos());