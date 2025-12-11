// Clase que representa un recurso dentro del sistema universitario
// Puede ser un libro, artículo, tesis, etc.
export class Recurso {
  id: number;        // Identificador único del recurso
  titulo: string;    // Título del recurso
  autor: string;     // Autor del recurso
  tipo: string;      // Tipo de publicación (Libro, Artículo, etc.)
  paginas: number;   // Número de páginas del recurso

  // Constructor que inicializa los valores del recurso
  constructor(id: number, titulo: string, autor: string, tipo: string, paginas: number) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.tipo = tipo;
    this.paginas = paginas;
  }
}

// Clase que administra la colección de recursos
export class SistemaUniversitario {
  recursos: Recurso[] = []; // Arreglo donde se almacenan todos los recursos registrados

  // Constructor que se ejecuta al crear una instancia de esta clase
  // Se encarga de cargar los datos previamente guardados en LocalStorage
  constructor() {
    this.cargarDesdeLocalStorage();
  }

  // Guarda la lista completa de recursos en LocalStorage
  guardarLocalStorage() {
    localStorage.setItem("recursos", JSON.stringify(this.recursos));
  }

  // Carga los recursos almacenados en LocalStorage (si existen)
  cargarDesdeLocalStorage() {
    const data = localStorage.getItem("recursos");
    // Si existe información, se convierte nuevamente a objetos
    if (data) {
      this.recursos = JSON.parse(data);
    }
  }

  // Genera un nuevo ID autoincremental basado en los IDs existentes
  generarNuevoId(): number {
    return this.recursos.length > 0
      ? Math.max(...this.recursos.map(r => r.id)) + 1 // Toma el ID mayor y suma 1
      : 1; // Si no hay recursos aún, el primer ID será 1
  }

  // Agrega un nuevo recurso a la colección
  agregarRecurso(recurso: Recurso) {
    this.recursos.push(recurso);  // Guarda el recurso en el arreglo
    this.guardarLocalStorage();   // Actualiza LocalStorage
  }


  // Método para editar un recurso ya existente
  // Recibe el ID del recurso y los nuevos datos que se modificarán
  editarRecurso(id: number, datos: Partial<Recurso>) {
    const recurso = this.recursos.find(r => r.id === id); // Busca el recurso por ID
    if (recurso) {
      Object.assign(recurso, datos); // Remplaza los datos del recurso con los nuevos
      this.guardarLocalStorage();    // Guarda nuevamente los cambios en LocalStorage
    }
  }
  
 
  // Sobrecarga del método buscar
  buscar(id: number): Recurso | undefined;
  buscar(nombre: string): Recurso | undefined;

  // Implementación del método buscar:
  // Si se pasa un número → busca por ID
  // Si se pasa texto → busca por título
  buscar(param: any): Recurso | undefined {
    if (typeof param === "number") {
      return this.recursos.find(r => r.id === param);
    } else {
      return this.recursos.find(
        r => r.titulo.toLowerCase() === param.toLowerCase()
      );
    }
  }

  // Elimina un recurso por ID
  eliminarRecurso(id: number) {
    // Filtra todos los recursos menos el que coincida con el ID
    this.recursos = this.recursos.filter(r => r.id !== id);
    this.guardarLocalStorage(); // Guarda los cambios
  }

  // Devuelve un arreglo con todos los recursos registrados
  obtenerTodos(): Recurso[] {
    return this.recursos;
  }
}
