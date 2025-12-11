// src/main.ts

import './style.css'; 
// Importamos la función de inicialización y la función para obtener el conteo inicial
import { initializeDomAndEvents, renderLibraryTable } from './Topics/DomHandlers';
import { getLibrary, setRenderCallback } from './Topics/LibraryCore'; 
import { type IpBook } from './Topics/Book'; 

// ========================================================================
// 1. RENDERIZADO DEL CONTENIDO HTML (Contiene solo el marcado)
// ========================================================================

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <header class="app-header">
        <span class="logo-icon">📚</span>
        <h1>Sistema Libros CRUD</h1>
        <p>Gestión eficiente de la biblioteca con TypeScript.</p>
    </header>
    
    <hr class="divider"/>

    <main class="app-main">
        
        <div class="content-section form-section">
            <h2 class="section-title">Agregar Nuevo Libro <span class="icon">➕</span></h2>
            <form id="add-book-form" class="book-form">
                <div class="form-group">
                    <label for="book-name">Nombre del Libro:</label>
                    <input type="text" id="book-name" required placeholder="Ej: Cien Años de Soledad">
                </div>
                <div class="form-group">
                    <label for="book-category">Categoría:</label>
                    <select id="book-category" required>
                        <option value="">-- Seleccione una --</option>
                        <option value="Ficción">Ficción</option>
                        <option value="Tecnología">Tecnología</option>
                        <option value="Ciencia">Ciencia</option>
                        <option value="Historia">Historia</option>
                        <option value="Fantasía">Fantasía</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="book-pages">N° de Páginas:</label>
                    <input type="number" id="book-pages" required min="1" placeholder="Ej: 496">
                </div>
                <button type="submit" class="primary-button">Guardar Libro</button>
            </form>
        </div>

        <div class="content-section table-section">
            <h2 class="section-title">Catálogo de la Biblioteca <span class="icon">📖</span></h2>

            <div class="search-controls">
                <div class="search-item">
                    <label for="search-input">Buscar por Nombre o ID:</label>
                    <input type="text" id="search-input" placeholder="Ej: Código o 3">
                </div>
                <p class="total-status">Libros Totales: <span id="total-books">${getLibrary().length}</span></p>
            </div>

            <div class="table-responsive">
                <table class="library-table">
                    <thead>
                        <tr>
                            <th>ID</th> <th>Nombre</th>
                            <th>Categoría</th>
                            <th class="text-right">Páginas</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="library-table-body">
                        </tbody>
                </table>
            </div>
        </div>

    </main>
    
    <footer class="app-footer">
        
    </footer>
`;

// ========================================================================
// 2. INICIALIZACIÓN
// ========================================================================

// La función initializeDomAndEvents se encargará de:
// 1. Obtener las referencias finales a los elementos del DOM.
// 2. Asignar los listeners de eventos.
// 3. Configurar el callback de renderizado en LibraryCore.
// 4. Llamar a renderLibraryTable() por primera vez.
initializeDomAndEvents();

export{};