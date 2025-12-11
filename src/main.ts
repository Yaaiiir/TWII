// Importa el CSS (bundler como Vite/webpack procesará esto)
import "./style.css";
// Importa las clases Recurso y SistemaUniversitario desde tu módulo
import { Recurso, SistemaUniversitario } from "./topics/SistemaUniversitario";

// Crea una instancia del sistema que administra los recursos.
// Al instanciar, el constructor del SistemaUniversitario carga los datos desde LocalStorage.
const sistema = new SistemaUniversitario();

// Variable que almacena el ID del recurso que se está editando.
// Si no se está editando ninguno, vale null.
let editandoId: number | null = null;

// =======================
// INTERFAZ: montaje inicial del DOM
// =======================

// Selecciona el contenedor principal con id="app" (existe en index.html).
// El operador "!" asume que el elemento existe (non-null assertion).
const app = document.querySelector<HTMLDivElement>("#app")!;

// Inserta el HTML principal de la interfaz dentro del contenedor.
// Aquí se crean formularios, botones y el área donde se mostrará la tabla de recursos.
app.innerHTML = `
<h1><i class="fa-solid fa-graduation-cap"></i> Sistema Universitario</h1>

<div class="card">
  <div class="card-title"><i class="fa-solid fa-plus"></i> Nuevo Recurso</div>
  <div class="formulario">
    <input id="titulo" placeholder="Título" />
    <input id="autor" placeholder="Autor" />

    <select id="tipo">
      <option value="Libro">Libro</option>
      <option value="Artículo">Artículo</option>
      <option value="Tesis">Tesis</option>
    </select>

    <input id="paginas" type="number" placeholder="Número de páginas" />
  </div>

  <button id="guardar"><i class="fa-solid fa-check"></i> Guardar</button>
  <button id="guardarCambios" style="display:none;"><i class="fa-solid fa-save"></i> Guardar Cambios</button>
</div>

<div class="card">
  <div class="card-title"><i class="fa-solid fa-search"></i> Buscar</div>
  
  <input id="busqueda" placeholder="Buscar por ID o Título" />

 
    <button id="buscar"><i class="fa-solid fa-magnifying-glass"></i> Buscar</button>
    <button id="verTodos"><i class="fa-solid fa-list"></i> Ver Todos</button>
 
</div>

<div class="card" id="resultado"></div>

`;

/*
  NOTAS sobre el HTML insertado:
  - Hay dos botones para guardar: uno para crear un nuevo recurso (id="guardar") y otro
    (id="guardarCambios") que se muestra cuando se está editando un recurso.
  - El área con id="resultado" será donde se renderice la tabla de recursos.
  - Se usan iconos de FontAwesome en el HTML; asegúrate de tener FontAwesome cargado si quieres verlos.
*/

// =======================
// REFERENCIAS A ELEMENTOS DEL DOM
// =======================
// Selecciona cada campo y botón del formulario para usarlos en los controladores de eventos.
// Se usa '!' porque asumimos que los elementos existen en el DOM (fueron insertados arriba).

const titulo = document.querySelector<HTMLInputElement>("#titulo")!;
const autor = document.querySelector<HTMLInputElement>("#autor")!;
const tipo = document.querySelector<HTMLSelectElement>("#tipo")!;
const paginas = document.querySelector<HTMLInputElement>("#paginas")!;
const busqueda = document.querySelector<HTMLInputElement>("#busqueda")!;
const resultado = document.querySelector<HTMLDivElement>("#resultado")!;
const btnGuardar = document.querySelector<HTMLButtonElement>("#guardar")!;
const btnGuardarCambios = document.querySelector<HTMLButtonElement>("#guardarCambios")!;

// =======================
// FUNCION: mostrarTabla
// =======================
// Genera dinámicamente el HTML de una tabla con los recursos recibidos.
// Cada fila incluye un botón "Eliminar" que tiene el atributo data-id con el id del recurso.
// (El código para "Editar" estaba comentado en tu versión; lo dejé comentado también.)
function mostrarTabla(recursos: Recurso[]) {
  // Si no hay recursos, muestra un mensaje amigable.
  if (recursos.length === 0) {
    resultado.innerHTML = "<p>No hay recursos registrados.</p>";
    return;
  }

  // Construye la tabla HTML usando template strings.
  // Esto convierte cada recurso en una fila <tr> con columnas <td>.
  resultado.innerHTML = `
    <table border="1" cellpadding="6">
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Autor</th>
          <th>Tipo</th>
          <th>Páginas</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${recursos.map(r => `
          <tr>
            <td>${r.id}</td>
            <td>${r.titulo}</td>
            <td>${r.autor}</td>
            <td>${r.tipo}</td>
            <td>${r.paginas}</td>
            <td> 
            <!--<button class="editar" data-id="${r.id}">Editar</button>-->
              <button class="eliminar" data-id="${r.id}">Eliminar</button>
            </td>
          </tr>`).join("")}
      </tbody>
    </table>
  `;

  // Añade comportamiento a los botones "Eliminar":
  // document.querySelectorAll(".eliminar") selecciona todos los botones de eliminar.
  document.querySelectorAll(".eliminar").forEach(btn => {
    // Por cada botón, añadimos un listener de click.
    btn.addEventListener("click", () => {
      // Recupera el id del recurso desde el atributo data-id del botón.
      // (dataset devuelve strings, por eso convertimos con Number).
      const id = Number((btn as HTMLElement).dataset.id);
      // Llama al método del sistema para eliminar el recurso por ID.
      sistema.eliminarRecurso(id);
      // Después de eliminar, vuelve a renderizar la tabla con los recursos actuales.
      mostrarTabla(sistema.obtenerTodos());
    });
  });
  
  /*
    NOTA:
    - Tenías el bloque para editar comentado. Si lo habilitas, añadiría la funcionalidad
      para rellenar el formulario con los datos del recurso y cambiar el formulario al modo "editar".
  */
}

// =======================
// EVENTOS
// =======================

// --- Agregar recurso ---
// Controlador para cuando el usuario hace click en "Guardar" (nuevo recurso).
btnGuardar.addEventListener("click", () => {
  // Validación simple: todos los campos obligatorios deben tener valor.
  if (!titulo.value || !autor.value || !paginas.value) {
    alert("Completa todos los campos.");
    return;
  }

  // Crea una nueva instancia de Recurso:
  // - generarNuevoId() calcula un id único basado en los recursos ya existentes.
  // - Number(paginas.value) transforma el string del input a número.
  const nuevo = new Recurso(
    sistema.generarNuevoId(),
    titulo.value,
    autor.value,
    tipo.value,
    Number(paginas.value)
  );

  // Agrega el recurso al sistema (que a su vez guarda en LocalStorage).
  sistema.agregarRecurso(nuevo);
  // Actualiza la tabla mostrando todos los recursos (incluido el recién agregado).
  mostrarTabla(sistema.obtenerTodos());

  // Limpia el formulario para dejarlo listo para el siguiente ingreso.
  titulo.value = "";
  autor.value = "";
  paginas.value = "";
});

// --- Guardar edición ---
// Controlador para cuando el usuario guarda los cambios de una edición.
// En tu versión el método editar está comentado en SistemaUniversitario; aquí
// dejamos la estructura lista por si decides activarlo.
btnGuardarCambios.addEventListener("click", () => {
  // Si no hay un id en edición, no hacemos nada.
  if (editandoId === null) return;

  
  // Si activas editarRecurso en SistemaUniversitario, podrías usar este bloque:
  sistema.editarRecurso(editandoId, {
    titulo: titulo.value,
    autor: autor.value,
    tipo: tipo.value,
    paginas: Number(paginas.value)
  });
  

  // Después de aplicar cambios (o aunque esté comentado), re-renderizamos la tabla.
  mostrarTabla(sistema.obtenerTodos());

  // Limpiamos el formulario y volvemos al modo "nuevo".
  titulo.value = "";
  autor.value = "";
  paginas.value = "";

  editandoId = null;
  btnGuardar.style.display = "inline-block";       // muestra botón de "Guardar"
  btnGuardarCambios.style.display = "none";        // oculta botón "Guardar Cambios"
});

// --- Buscar ---
// Botón que busca por ID o por título según lo que el usuario escriba.
// Si el valor se parsea a número (no NaN) se buscará por ID, si no, por título.
document.querySelector("#buscar")!.addEventListener("click", () => {
  const valor = busqueda.value;
  if (!valor) return; // si el campo está vacío, no hace nada

  const posibleId = Number(valor);
  // isNaN(posibleId) devuelve true si no se pudo convertir a número
  const recurso = isNaN(posibleId)
    ? sistema.buscar(valor)      // búsqueda por título (string)
    : sistema.buscar(posibleId); // búsqueda por ID (number)

  // Si se encuentra, mostramos una tabla con el resultado; si no, un mensaje.
  recurso ? mostrarTabla([recurso]) : resultado.innerHTML = "<p>No se encontró el recurso.</p>";
});

// --- Ver todos ---
// Muestra todos los recursos en la tabla.
document.querySelector("#verTodos")!.addEventListener("click", () => {
  mostrarTabla(sistema.obtenerTodos());
});

// =======================
// Inicio: renderiza la tabla inicial con los recursos cargados desde LocalStorage
// =======================
mostrarTabla(sistema.obtenerTodos());
