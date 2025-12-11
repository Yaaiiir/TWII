//--------------------------------------------------------------------------------------------------------------
//La desestructuración es una expresión de JavaScript que hace posible desempaquetar valores de arrays (arreglos)
//  o propiedades de objetos en variables distintas.
//El principal beneficio es la legibilidad y la reducción del código (boilerplate).
//Desestructuracion de Objetos
//Es la forma más común de usar la desestructuración, y se utiliza para extraer propiedades de un objeto por su nombre.
//----------------------------------------------------------------------------------------------------------------------

//Sintaxis básica:
// -----------------------------------------------------------
// 1. Declaración de las estructuras de datos (Fuente)
// -----------------------------------------------------------

// Definimos una interfaz para permitir propiedades opcionales
interface Persona {
    nombre: string;
    edad: number;
    ciudad: string;
    pais?: string; // opcional, necesaria para la desestructuración con default
}

// Objeto base para la mayoría de los ejemplos
const persona: Persona = {
    nombre: 'Ana',
    edad: 30,
    ciudad: 'Madrid'
};

// Objeto para demostrar la desestructuración anidada
const empleado = {
    id: 123,
    infoPersonal: {
        nombre: 'Carlos',
        apellido: 'García'
    }
};

// -----------------------------------------------------------
// 2. DEMOSTRACIÓN DE TÉCNICAS DE DESESTRUCTURACIÓN
// -----------------------------------------------------------

// --- A. Desestructuración Básica (Asignación por nombre de propiedad) ---
{
    // Método antiguo (Sin desestructuración): Requiere una línea por asignación.
    const nombreAlumno = persona.nombre;
    const edadAlumno = persona.edad;

    console.log(`[A. Sin Destr.] Nombre: ${nombreAlumno}, Edad: ${edadAlumno}`);

    // Método moderno (Con desestructuración): Asigna las variables 'nombre' y 'edad'
    // directamente extrayendo propiedades con el mismo nombre del objeto 'persona'.
    const { nombre: nombreA, edad: edadA } = persona;
    console.log(`[A. Destr. Simple] Nombre: ${nombreA}, Edad: ${edadA}`); 
}

// --- B. Desestructuración con Renombrado y Valores por Defecto ---
{
    // Renombrado (Alias): Extrae la propiedad 'nombre' y la asigna a la nueva variable 'nombrePersona'.
    const { nombre: nombrePersona, edad: edadPersona } = persona;
    console.log(`[B. Renombrado] Nombre: ${nombrePersona}, Edad: ${edadPersona}`);

    // Valor por Defecto: Permite que 'pais' no exista en persona sin causar error.
    const { ciudad = 'Desconocida', pais = 'España' } = persona;
    console.log(`[B. Default] Ciudad: ${ciudad}, País: ${pais}`);
}

// --- C. Desestructuración Anidada ---
{
    // Desestructuración Anidada: Accede a las propiedades dentro de otro objeto.
    const { infoPersonal: { nombre: nombreEmpleado, apellido } } = empleado;
    console.log(`[C. Anidada] Nombre: ${nombreEmpleado}, Apellido: ${apellido}`);
}

// --- D. Desestructuración con Operador Rest (`...`) ---
{
    // Operador Rest: Extrae 'nombre' y agrupa el resto en un nuevo objeto.
    const { nombre: nombreResto, ...restoInfo } = persona;

    console.log(`[D. Rest] Nombre: ${nombreResto}`);
    console.log(`[D. Rest] Resto de la info:`, restoInfo);
}

export {};
