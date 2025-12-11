
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

// Objeto base para la mayoría de los ejemplos
const persona = {
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
    const { nombre, edad } = persona;
    console.log(`[A. Destr. Simple] Nombre: ${nombre}, Edad: ${edad}`); 
}

// --- B. Desestructuración con Renombrado y Valores por Defecto ---
{
    // Renombrado (Alias): Extrae la propiedad 'nombre' y la asigna a la nueva variable 'nombrePersona'.
    // Esto es útil para evitar conflictos de nombres con variables existentes.
    const { nombre: nombrePersona, edad: edadPersona } = persona;
    console.log(`[B. Renombrado] Nombre: ${nombrePersona}, Edad: ${edadPersona}`); // 'Ana', 30

    // Valor por Defecto: Intenta extraer 'pais'. Como 'persona' no tiene 'pais',
    // se asigna el valor por defecto 'España'. 'ciudad' sí existe, por lo que toma 'Madrid'.
    const { ciudad = 'Desconocida', pais = 'España' } = persona; 
    console.log(`[B. Default] Ciudad: ${ciudad}, País: ${pais}`); // 'Madrid', 'España'
}

// --- C. Desestructuración Anidada ---
{
    // Desestructuración Anidada: Accede a las propiedades dentro de otro objeto
    // en una sola línea. Extrae 'infoPersonal' y, dentro de esta, extrae 'nombre' y 'apellido'.
    const { infoPersonal: { nombre, apellido } } = empleado;
    console.log(`[C. Anidada] Nombre: ${nombre}, Apellido: ${apellido}`); // 'Carlos', 'García'

    // Nota: La variable 'infoPersonal' NO se crea en el scope local con esta sintaxis.
}

// --- D. Desestructuración con Operador Rest (`...`) ---
{
    // Operador Rest: Extrae la propiedad 'nombre' normalmente, y el resto de
    // las propiedades (edad, ciudad) son agrupadas en un nuevo objeto llamado 'restoInfo'.
    // Importante: Aquí se usa 'nombreResto' para evitar el conflicto con la variable 'nombre' de arriba.
    const { nombre: nombreResto, ...restoInfo } = persona;

    console.log(`[D. Rest] Nombre: ${nombreResto}`); // 'Ana'
    console.log(`[D. Rest] Resto de la info:`, restoInfo); // { edad: 30, ciudad: 'Madrid' }
}



export{};