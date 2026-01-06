// topics/Funciones.ts

// Importamos las clases/elementos necesarios desde el módulo SistemaUniversitario.
import { Recurso, SistemaUniversitario } from "./SistemaUniversitario";

// Función pública que inicializa la interfaz dentro del DIV `app` recibido.
// Recibe el elemento contenedor (app) donde se inyectará el HTML y se
// enganchará toda la lógica de los botones y visualización.
export function inicializarInterfaz(app: HTMLDivElement) {
  // Creamos una instancia del sistema que gestiona recursos (modelo/servicio).
  const sistema = new SistemaUniversitario();

  // El HTML de la interfaz: formulario para crear recursos,
app.innerHTML = `
<!-- Título principal del sistema -->
<h2>Sistema Universitario de Recursos</h2>

<!-- Contenedor del formulario para agregar nuevos recursos -->
<div class="formulario">

  <!-- Primera fila: título y autor -->
  <div class="fila">
    <!-- Título del recurso -->
    <input id="titulo" placeholder="Título" />

    <!-- Input para capturar el autor -->
    <input id="autor" placeholder="Autor" />
  </div>

  <!-- Segunda fila: tipo de recurso y páginas -->
  <div class="fila">

    <!-- Selector del tipo de recurso -->
    <select id="tipo">
      <option value="Libro">Libro</option>
      <option value="Artículo">Artículo</option>
      <option value="Tesis">Tesis</option>
    </select>

    <!-- Input numérico para indicar el número de páginas -->
    <input id="paginas" type="number" placeholder="Número de páginas" />
  </div>

  <!-- Botón para guardar un nuevo recurso -->
  <button id="guardar">Guardar</button>
</div>

<!-- Línea divisoria visual -->
<hr>

<!-- Sección de búsqueda -->
<h3>Búsqueda de Recursos</h3>

<!-- Contenedor de la interfaz de búsqueda -->
<div class="buscar-contenedor">
  <!-- Input para buscar por ID o título -->
  <input id="busqueda" placeholder="Buscar por ID o Título" />

  <!-- Botón que ejecuta la búsqueda -->
  <button id="buscar">Buscar</button>
</div>

<!-- Otra línea divisoria visual -->
<hr>

<!-- Botón que permite mostrar la lista completa de recursos -->
<button id="verTodos">Ver Todos los Recursos</button>

<!-- Contenedor donde se mostrará la tabla de resultados o mensajes -->
<div id="resultado"></div>
`;


  // === Referencias a elementos del DOM ===
  // Obtenemos referencias tipadas a los inputs/selects que usaremos.
  const titulo = document.querySelector<HTMLInputElement>("#titulo")!;
  const autor = document.querySelector<HTMLInputElement>("#autor")!;
  const tipo = document.querySelector<HTMLSelectElement>("#tipo")!;
  const paginas = document.querySelector<HTMLInputElement>("#paginas")!;
  const busqueda = document.querySelector<HTMLInputElement>("#busqueda")!;
  const resultado = document.querySelector<HTMLDivElement>("#resultado")!;

  // === Función auxiliar: mostrarTabla ===
  // Recibe un array de Recurso y renderiza una tabla HTML dentro del `resultado`.
  function mostrarTabla(recursos: Recurso[]) {
    // Si no hay recursos, mostramos un mensaje informativo.
    if (recursos.length === 0) {
      resultado.innerHTML = "<p>No hay recursos registrados.</p>";
      return;
    }

    // Construimos la tabla con los datos de cada recurso.
    resultado.innerHTML = `
  <!-- Tabla que mostrará todos los recursos guardados -->
  <table border="1" cellpadding="6">

    <!-- Encabezado de la tabla -->
    <thead>
      <tr>
        <!-- Columna para el ID del recurso -->
        <th>ID</th>

        <!-- Columna para el título del recurso -->
        <th>Título</th>

        <!-- Columna para el autor del recurso -->
        <th>Autor</th>

        <!-- Columna para el tipo (Libro, Artículo, Tesis) -->
        <th>Tipo</th>

        <!-- Columna para el número de páginas -->
        <th>Páginas</th>

        <!-- Columna para los botones de acciones (eliminar) -->
        <th>Eliminar</th>
      </tr>
    </thead>

    <!-- Cuerpo de la tabla donde se insertan los recursos -->
    <tbody>
      ${
        recursos
          .map(
            r => `
        <!-- Fila correspondiente a un recurso -->
        <tr>
          <!-- Celda: ID autogenerado -->
          <td>${r.id}</td>

          <!-- Celda: título capturado en el formulario -->
          <td>${r.titulo}</td>

          <!-- Celda: autor del recurso -->
          <td>${r.autor}</td>

          <!-- Celda: tipo de recurso -->
          <td>${r.tipo}</td>

          <!-- Celda: número de páginas -->
          <td>${r.paginas}</td>

          <!-- Celda: botón para eliminar este recurso -->
          <!-- El atributo data-id almacena el ID para identificar qué recurso borrar -->
          <td>
            <button class="eliminar" data-id="${r.id}">Eliminar</button>
          </td>
        </tr>
        `
          )
          .join("") // Se unen todas las filas generadas en un solo string
      }
    </tbody>
  </table>
`;


    // === Enlazamos los botones "Eliminar" que acabamos de renderizar ===
    // Seleccionamos todos los botones con clase .eliminar y les añadimos
    // un listener para eliminar el recurso correspondiente.
    document.querySelectorAll(".eliminar").forEach(btn => {
      btn.addEventListener("click", () => {
        // dataset devuelve strings; convertimos a Number para la eliminación.
        const id = Number((btn as HTMLElement).dataset.id);
        // Llamamos al método del sistema que elimina por id.
        sistema.eliminarRecurso(id);
        // Volvemos a renderizar la tabla con los recursos actuales.
        mostrarTabla(sistema.obtenerTodos());
      });
    });
  }
  

  // === Evento: Guardar recurso ===
  // Al hacer click en "guardar" validamos campos y creamos un nuevo Recurso.
  document.querySelector("#guardar")!.addEventListener("click", () => {
    // Validación básica: todos los campos obligatorios.
    if (!titulo.value || !autor.value || !paginas.value) {
      alert("Completa todos los campos.");
      return;
    }

    // Creamos el nuevo recurso usando un ID generado por el sistema.
    // IMPORTANTE: convertir páginas a número (Number).
    const nuevo = new Recurso(
      sistema.generarNuevoId(), // método del sistema que devuelve el próximo ID
      titulo.value,
      autor.value,
      tipo.value,
      Number(paginas.value)
    );

    // Agregamos el recurso al sistema (persistencia en memoria o storage).
    sistema.agregarRecurso(nuevo);
    alert("Recurso agregado correctamente.");

    // Limpiamos los campos del formulario para nueva entrada.
    titulo.value = "";
    autor.value = "";
    paginas.value = "";
  });

  // === Evento: Buscar recurso por ID o título ===
  document.querySelector("#buscar")!.addEventListener("click", () => {
    const valor = busqueda.value;

    // Validación: campo de búsqueda no vacío.
    if (!valor) {
      alert("Ingresa ID o Título.");
      return;
    }

    // Intentamos convertir a número; si no es número, lo tratamos como título.
    const posibleId = Number(valor);
    const recurso = isNaN(posibleId)
      ? sistema.buscar(valor)   // buscar por título (string)
      : sistema.buscar(posibleId); // buscar por id (number)

    // Si encontramos el recurso lo mostramos en una tabla de una fila.
    if (recurso) {
      mostrarTabla([recurso]);
    } else {
      resultado.innerHTML = "<p>No se encontró el recurso.</p>";
    }
  });

  // === Evento: Mostrar todos los recursos ===
  document.querySelector("#verTodos")!.addEventListener("click", () => {
    mostrarTabla(sistema.obtenerTodos());
  });
}
