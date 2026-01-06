// Clase que representa un recurso académico dentro del sistema
export class Recurso {
  id: number;       // Identificador único
  titulo: string;   // Título del recurso
  autor: string;    // Autor del recurso
  tipo: string;     // Tipo: Libro, Artículo, Tesis, etc.
  paginas: number;  // Número de páginas

  // Constructor que inicializa un recurso con todos sus datos
  constructor(id: number, titulo: string, autor: string, tipo: string, paginas: number) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.tipo = tipo;
    this.paginas = paginas;
  }
}

// Clase principal que administra todos los recursos del sistema universitario
export class SistemaUniversitario {
  private storageKey = "recursos_v1"; // Clave con versión para LocalStorage
  recursos: Recurso[] = [];           // Arreglo donde se guardarán los recursos cargados

  // Al crear una instancia, automáticamente carga lo que exista en LocalStorage
  constructor() {
    this.cargarDesdeLocalStorage();
  }

  // Guarda el arreglo completo de recursos dentro de LocalStorage
  guardarLocalStorage() {
    try {
      // Convierte el array a JSON y lo guarda con la clave indicada
      localStorage.setItem(this.storageKey, JSON.stringify(this.recursos));
    } catch (e) {
      console.error("Error guardando en LocalStorage:", e);
    }
  }

  // Carga la información previamente guardada en LocalStorage
  cargarDesdeLocalStorage() {
    try {
      // Obtiene el JSON desde LocalStorage
      const data = localStorage.getItem(this.storageKey);

      // Si no existe, significa que no hay datos guardados
      if (!data) {
        this.recursos = [];
        return;
      }

      // Parsea la cadena JSON a un objeto JavaScript
      const parsed = JSON.parse(data);

      // Validación: esperamos que sea un arreglo
      if (!Array.isArray(parsed)) {
        console.warn("Los datos en LocalStorage no son un arreglo. Se inicia vacío.");
        this.recursos = [];
        return;
      }

      // “Revive” cada objeto para transformarlo nuevamente en una instancia de Recurso
      this.recursos = parsed.map((p: any) => {
        // Se validan los campos mínimos
        const id = typeof p.id === "number" ? p.id : 0;
        const titulo = typeof p.titulo === "string" ? p.titulo : "";
        const autor = typeof p.autor === "string" ? p.autor : "";
        const tipo = typeof p.tipo === "string" ? p.tipo : "Libro";
        const paginas = typeof p.paginas === "number" ? p.paginas : 0;

        // Se crea una instancia completamente funcional
        return new Recurso(id, titulo, autor, tipo, paginas);
      });

    } catch (e) {
      console.error("Error leyendo o parseando LocalStorage, se inicia vacío:", e);
      this.recursos = [];
      // Opcional: borrar datos corruptos
      // localStorage.removeItem(this.storageKey);
    }
  }

  // Genera un nuevo ID basándose en el ID más alto existente
  generarNuevoId(): number {
    return this.recursos.length > 0
      ? Math.max(...this.recursos.map(r => r.id)) + 1
      : 1; // Si no hay recursos, inicia en 1
  }

  // Agrega un nuevo recurso al sistema y lo persiste en LocalStorage
  agregarRecurso(recurso: Recurso) {
    this.recursos.push(recurso);
    this.guardarLocalStorage();
  }

  // Permite editar un recurso existente usando sus propiedades parciales
  editarRecurso(id: number, datos: Partial<Recurso>) {
    const recurso = this.recursos.find(r => r.id === id);

    // Si se encuentra, se actualizan solo las propiedades enviadas
    if (recurso) {
      Object.assign(recurso, datos);
      this.guardarLocalStorage();
    }
  }

  // Sobrecarga de método buscar: puede buscar por ID o por nombre
  buscar(id: number): Recurso | undefined;
  buscar(nombre: string): Recurso | undefined;

  // Implementación real del método buscar
  buscar(param: any): Recurso | undefined {
    // Si el parámetro es número → buscar por ID
    if (typeof param === "number") {
      return this.recursos.find(r => r.id === param);
    }
    // Si es texto → buscar por título (ignorando mayúsculas/minúsculas)
    else {
      return this.recursos.find(r => r.titulo.toLowerCase() === param.toLowerCase());
    }
  }

  // Elimina un recurso según su ID y actualiza LocalStorage
  eliminarRecurso(id: number) {
    // Filtra el array dejando solo los que NO coincidan
    this.recursos = this.recursos.filter(r => r.id !== id);
    this.guardarLocalStorage();
  }

  // Devuelve todos los recursos registrados
  obtenerTodos(): Recurso[] {
    return this.recursos;
  }

  // Función opcional para limpiar el sistema (útil para pruebas)
  limpiarTodo() {
    this.recursos = [];
    localStorage.removeItem(this.storageKey);
  }
}
