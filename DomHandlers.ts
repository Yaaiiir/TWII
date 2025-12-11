// src/Topist/DomHandlers.ts

import { getLibrary, getBookCount, searchBooks, addBook, deleteBook, setRenderCallback } from './LibraryCore';
import { type IpBook } from './Book'; // Importa la interfaz

// --- VARIABLES GLOBALES DEL DOM ---
let tableBody: HTMLTableSectionElement | null = null;
let searchInput: HTMLInputElement | null = null;
let totalBooksSpan: HTMLSpanElement | null = null;
let addBookForm: HTMLFormElement | null = null;


// ========================================================================
// 1. MANEJO DEL DOM Y RENDERIZADO
// ========================================================================

/**
 * Renderiza la tabla de libros en la UI.
 * @param booksToRender El array de libros a mostrar.
 */
export function renderLibraryTable(booksToRender: IpBook[] = getLibrary()): void {
    
    // Si la tabla no se ha encontrado todavía (la primera vez), intentamos obtenerla.
    if (!tableBody) {
        tableBody = document.querySelector<HTMLTableSectionElement>('#library-table-body');
        if (!tableBody) {
            console.error("El cuerpo de la tabla (#library-table-body) no se encontró.");
            return; 
        }
    }
    if (!totalBooksSpan) {
        totalBooksSpan = document.querySelector<HTMLSpanElement>('#total-books');
    }

    if (totalBooksSpan) {
        totalBooksSpan.textContent = String(getBookCount());
    }
    
    tableBody.innerHTML = ''; 

    if (booksToRender.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="empty-message">No hay libros registrados o no se encontraron resultados.</td></tr>';
        return;
    }

    booksToRender.forEach(book => {
        const row = document.createElement('tr');
        row.dataset.bookId = String(book.id); 
        
        row.innerHTML = `
            <td>${book.id}</td> <td>${book.nombre}</td>
            <td>${book.categoria}</td>
            <td class="text-right">${book.paginas}</td>
            <td>
                <button class="delete-btn" data-book-id="${book.id}" aria-label="Eliminar libro ${book.nombre}">
                    Eliminar
                </button>
            </td>
        `;
        
        const deleteBtn = row.querySelector('.delete-btn');
        deleteBtn?.addEventListener('click', (event) => {
            const btn = event.target as HTMLButtonElement;
            const bookId = btn.dataset.bookId;
            if (bookId) {
                // deleteBook llamará a renderLibraryTable a través del callback
                deleteBook(bookId); 
            }
        });

        tableBody!.appendChild(row);
    });
}

// ========================================================================
// 2. HANDLERS DE EVENTOS
// ========================================================================

function handleAddFormSubmit(event: Event): void {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    // Usamos el DOM para obtener las referencias
    const nombreInput = document.querySelector<HTMLInputElement>('#book-name')!;
    const categoriaInput = document.querySelector<HTMLSelectElement>('#book-category')!;
    const paginasInput = document.querySelector<HTMLInputElement>('#book-pages')!;
    
    const nombre = nombreInput.value.trim();
    const categoria = categoriaInput.value;
    const paginas = parseInt(paginasInput.value, 10);

    if (nombre && categoria && !isNaN(paginas) && paginas > 0) {
        addBook(nombre, categoria, paginas); // addBook se encarga de llamar a renderizar
        form.reset();
        nombreInput.focus();
    } else {
        alert("Por favor, rellena todos los campos correctamente.");
    }
}

function handleSearchInput(): void {
    if (searchInput) {
        const results = searchBooks(searchInput.value);
        renderLibraryTable(results);
    }
}

// ========================================================================
// 3. INICIALIZACIÓN
// ========================================================================

export function initializeDomAndEvents(): void {
    // 1. Obtener referencias al DOM
    addBookForm = document.querySelector<HTMLFormElement>('#add-book-form');
    searchInput = document.querySelector<HTMLInputElement>('#search-input');
    
    // 2. Configurar el callback de renderizado en LibraryCore
    // Esto permite que la lógica de datos notifique al DOM que se actualice.
    setRenderCallback(renderLibraryTable);

    // 3. Asignar los eventos
    if (addBookForm) {
        addBookForm.addEventListener('submit', handleAddFormSubmit);
    }
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
    }
    
    // 4. Renderizar la tabla inicial
    renderLibraryTable();
}