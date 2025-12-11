// src/Topist/LibraryCore.ts

import { Libro, type IpBook } from './Book'; // Importa desde el Book.ts en la misma carpeta

const STORAGE_KEY = 'library_storage';
let nextId = 1; 
let library: Libro[] = [];

// ========================================================================
// 1. Lógica de Almacenamiento y Carga
// ========================================================================

export function saveLibrary(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
}

function loadLibrary(): Libro[] {
    const storedData = localStorage.getItem(STORAGE_KEY);
    let loadedBooks: Libro[] = [];
    
    if (storedData) {
        const rawBooks = JSON.parse(storedData) as IpBook[];
        loadedBooks = rawBooks.map(book => 
            new Libro(book.nombre, book.categoria, book.paginas, book.id) 
        );
        if (loadedBooks.length > 0) {
            const maxId = loadedBooks.reduce((max, book) => Math.max(max, book.id), 0);
            nextId = maxId + 1;
        } else {
            nextId = 1;
        }
        return loadedBooks;
    }
    
    // Lista inicial por defecto: Usar IDs secuenciales 1, 2, 3
    loadedBooks = [
        new Libro("Cien Años de Soledad", "Ficción", 496, 1),
        new Libro("El Principito", "Fantasía", 96, 2),
        new Libro("Clean Code", "Tecnología", 431, 3),
    ];
    nextId = 4;
    return loadedBooks;
}

// Inicializar la biblioteca
library = loadLibrary();


// ========================================================================
// 2. Funciones Core del CRUD
// ========================================================================

// Estas funciones ahora necesitan una referencia a la función de renderizado
// que estará en DomHandlers, por eso creamos una función de callback.
let renderCallback: () => void = () => {};

export function setRenderCallback(callback: () => void): void {
    renderCallback = callback;
}

export function addBook(nombre: string, categoria: string, paginas: number): void {
    const nuevoLibro = new Libro(nombre, categoria, paginas, nextId); 
    nextId++; 

    library.push(nuevoLibro);
    saveLibrary(); 
    console.log(`Libro agregado: ${nuevoLibro.nombre} con ID ${nuevoLibro.id}`);
    renderCallback(); // Llama al renderizado para actualizar la UI
}

export function deleteBook(idStr: string): void {
    const idToDelete = parseInt(idStr, 10);
    const initialLength = library.length;
    library = library.filter(book => book.id !== idToDelete); 

    if (library.length < initialLength) {
        saveLibrary(); 
        console.log(`Libro con ID ${idToDelete} eliminado.`);
        renderCallback(); // Llama al renderizado para actualizar la UI
    }
}

export function searchBooks(query: string): IpBook[] {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) {
        return library;
    }
    
    const queryAsNumber = parseInt(normalizedQuery, 10); 

    return library.filter(({ id, nombre }) => 
        nombre.toLowerCase().includes(normalizedQuery) ||
        (!isNaN(queryAsNumber) && id === queryAsNumber)
    );
}

// Funciones accesoras
export function getLibrary(): IpBook[] {
    return library;
}

export function getBookCount(): number {
    return library.length;
}