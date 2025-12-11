// main.ts

// 1. Importa la clase del sistema de gestión de datos
import { UniversitySystem } from "./topics/universitySystem"; // O la ruta correcta a tu archivo de clases

// 2. Importa la clase que maneja la Interfaz de Usuario y los eventos
import { ResourceApp } from "./topics/ResourceApp"; // Asegúrate de que esta sea la ruta correcta

// =========================================================
// INICIALIZACIÓN DE LA APLICACIÓN
// =========================================================

// Crea una instancia del sistema de datos (el modelo)
const sistema = new UniversitySystem();

// Crea una instancia de la aplicación/UI, pasándole el sistema de datos
const app = new ResourceApp(sistema);