import { LibroManager } from "./libro-manager";

const manager = new LibroManager();

// Inputs
const nombreInput = document.getElementById("nombre") as HTMLInputElement;
const categoriaInput = document.getElementById("categoria") as HTMLSelectElement;
const paginasInput = document.getElementById("paginas") as HTMLInputElement;

// Botón agregar/actualizar
const btnAgregar = document.getElementById("btnAgregar") as HTMLButtonElement;

// Tabla y buscador
const tabla = document.getElementById("tablaLibros") as HTMLTableSectionElement;
const buscador = document.getElementById("buscador") as HTMLInputElement;

// Estado de edición
let libroEnEdicion: string | null = null;


// ---- FUNCIONES ----

function clearEditingRowClass() {
    tabla.querySelectorAll("tr").forEach(row => row.classList.remove("editing"));
}

function renderTabla(libros = manager.obtenerLibros()) {
    tabla.innerHTML = "";

    libros.forEach(libro => {
        const row = document.createElement("tr");

        const idTd = document.createElement("td");
        idTd.textContent = libro.id;

        const nombreTd = document.createElement("td");
        nombreTd.textContent = libro.nombre;

        const catTd = document.createElement("td");
        catTd.textContent = libro.categoria;

        const pagsTd = document.createElement("td");
        pagsTd.textContent = libro.paginas.toString();

        const accionesTd = document.createElement("td");
        accionesTd.style.whiteSpace = "nowrap";

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn-eliminar";

        btnEliminar.onclick = (ev) => {
            ev.stopPropagation();
            if (confirm(`¿Deseas eliminar el libro "${libro.nombre}"?`)) {
                manager.eliminarLibro(libro.id);

                if (libroEnEdicion === libro.id) {
                    libroEnEdicion = null;
                    btnAgregar.textContent = "Agregar";
                    nombreInput.value = "";
                    paginasInput.value = "";
                }

                renderTabla();
            }
        };

        accionesTd.appendChild(btnEliminar);

        row.onclick = () => {
            libroEnEdicion = libro.id;

            nombreInput.value = libro.nombre;
            categoriaInput.value = libro.categoria;
            paginasInput.value = libro.paginas.toString();

            btnAgregar.textContent = "Actualizar";

            clearEditingRowClass();
            row.classList.add("editing");
        };

        row.appendChild(idTd);
        row.appendChild(nombreTd);
        row.appendChild(catTd);
        row.appendChild(pagsTd);
        row.appendChild(accionesTd);

        tabla.appendChild(row);
    });
}


// ---- BOTÓN AGREGAR / ACTUALIZAR ----

btnAgregar.onclick = () => {
    const nombre = nombreInput.value.trim();
    const categoria = categoriaInput.value;
    const paginas = Number(paginasInput.value);

    if (!nombre || !paginas) {
        alert("Completa todos los campos.");
        return;
    }

    if (libroEnEdicion) {
        manager.actualizarLibro(libroEnEdicion, nombre, categoria, paginas);
        libroEnEdicion = null;
        btnAgregar.textContent = "Agregar";
        clearEditingRowClass();
    } else {
        manager.agregarLibro(nombre, categoria, paginas);
    }

    nombreInput.value = "";
    paginasInput.value = "";

    renderTabla();
};


// ---- BUSCADOR ----

buscador.oninput = () => {
    const filtro = buscador.value.trim();
    if (!filtro) {
        renderTabla();
    } else {
        const resultados = manager.buscar(filtro);
        renderTabla(resultados);
    }
};


// ---- RENDER INICIAL ----
renderTabla();
