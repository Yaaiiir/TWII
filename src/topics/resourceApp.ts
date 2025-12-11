import { UniversitySystem, Libro, Articulo, RecursoBase } from "./universitySystem";

export class ResourceApp {
    private sistema: UniversitySystem;

    private form = document.getElementById("resourceForm") as HTMLFormElement;
    private tipoSelect = document.getElementById("tipo") as HTMLSelectElement;

    private autorInput = document.getElementById("autor") as HTMLInputElement;
    private nombreInput = document.getElementById("nombre") as HTMLInputElement;

    private anioInput = document.getElementById("anio") as HTMLInputElement;
    private paginasInput = document.getElementById("paginas") as HTMLInputElement;

    private tablaRecursos = document.getElementById("tablaRecursos") as HTMLTableElement;

    private formBuscar = document.getElementById("form-buscar") as HTMLFormElement;
    private buscarTextoInput = document.getElementById("buscar-texto") as HTMLInputElement;

    private editForm = document.getElementById("form-editar") as HTMLFormElement;
    private editId = document.getElementById("edit-id") as HTMLInputElement;
    private editNombre = document.getElementById("edit-nombre") as HTMLInputElement;
    private editAutor = document.getElementById("edit-autor") as HTMLInputElement;
    private editAnio = document.getElementById("edit-anio") as HTMLInputElement;
    private editPaginas = document.getElementById("edit-paginas") as HTMLInputElement;
    private editContainer = document.getElementById("card-editar") as HTMLElement;

    constructor(sistema: UniversitySystem) {
        this.sistema = sistema;
        this.initializeListeners();
        this.actualizarTabla();
    }

    private initializeListeners(): void {
        this.tipoSelect.addEventListener("change", this.handleTipoChange.bind(this));
        this.form.addEventListener("submit", this.handleAgregar.bind(this));
        this.formBuscar.addEventListener("submit", this.handleBuscar.bind(this));
        this.editForm.addEventListener("submit", this.handleGuardarEdicion.bind(this));
    }

    private handleTipoChange(): void {
        if (this.tipoSelect.value === "Libro") {
            this.autorInput.disabled = false;
            this.paginasInput.disabled = false;
            this.anioInput.disabled = true;
            this.anioInput.value = "";
        } else if (this.tipoSelect.value === "Artículo") {
            this.autorInput.disabled = false;
            this.paginasInput.disabled = true;
            this.paginasInput.value = "";
            this.anioInput.disabled = false;
        } else {
            this.autorInput.disabled = true;
            this.anioInput.disabled = true;
            this.paginasInput.disabled = true;
        }
    }

    private handleAgregar(e: Event): void {
        e.preventDefault();

        const id = Date.now();
        const nombre = this.nombreInput.value;
        const tipo = this.tipoSelect.value;
        const autor = this.autorInput.value;

        let recurso: RecursoBase;

        if (tipo === "Libro") {
            const paginas = Number(this.paginasInput.value);
            recurso = new Libro(id, nombre, autor, paginas);
        } else if (tipo === "Artículo") {
            const anio = Number(this.anioInput.value);
            recurso = new Articulo(id, nombre, autor, anio);
        } else {
            alert("Seleccione un tipo válido");
            return;
        }

        this.sistema.agregarRecurso(recurso);
        this.form.reset();
        this.actualizarTabla();
    }

    private handleBuscar(e: Event): void {
        e.preventDefault();
        const query = this.buscarTextoInput.value;
        const resultados = this.sistema.buscarRecursos(query);
        this.actualizarTabla(resultados);
    }

    private handleGuardarEdicion(e: Event): void {
        e.preventDefault();

        const id = Number(this.editId.value);
        const nombre = this.editNombre.value;
        const autor = this.editAutor.value;
        const anio = Number(this.editAnio.value);
        const paginas = Number(this.editPaginas.value);

        this.sistema.actualizarRecurso(id, { nombre, autor, anio, paginas });

        this.editForm.reset();
        this.editContainer.style.display = "none";
        this.actualizarTabla();
    }

    private actualizarTabla(lista?: RecursoBase[]): void {
        this.tablaRecursos.innerHTML = "";

        const recursos = lista || this.sistema.obtenerRecursos();

        recursos.forEach(r => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${r.id}</td>
                <td>${r.nombre}</td>
                <td>${r.tipo}</td>
                <td>${(r as any).autor ?? "-"}</td>
                <td>${(r as any).anio ?? "-"}</td>
                <td>${(r as any).paginas ?? "-"}</td>
                <td>
                    <button class="editar-btn" data-id="${r.id}">Editar</button>
                    <button class="eliminar-btn" data-id="${r.id}">Eliminar</button>
                </td>
            `;

            this.tablaRecursos.appendChild(fila);
        });

        document.querySelectorAll(".eliminar-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = Number(btn.getAttribute("data-id"));
                this.sistema.eliminarRecurso(id);
                this.actualizarTabla();
            });
        });

        document.querySelectorAll(".editar-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = Number(btn.getAttribute("data-id"));
                this.cargarDatosEdicion(id);
            });
        });
    }

    private cargarDatosEdicion(id: number): void {
        const r = this.sistema.buscarRecurso(id);
        if (!r) return;

        this.editId.value = r.id.toString();
        this.editNombre.value = r.nombre;
        this.editAutor.value = (r as any).autor ?? "";

        if (r instanceof Libro) {
            this.editPaginas.value = r.paginas.toString();
            this.editPaginas.disabled = false;

            this.editAnio.value = "";
            this.editAnio.disabled = true;
        }

        if (r instanceof Articulo) {
            this.editAnio.value = r.anio.toString();
            this.editAnio.disabled = false;

            this.editPaginas.value = "";
            this.editPaginas.disabled = true;
        }

        this.editContainer.style.display = "block";
    }
}
