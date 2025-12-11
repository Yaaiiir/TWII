//--------------------------------------------------------------------------------------------------------------
// Anatomía de una función en TypeScript
// Sintaxis estándar
// (param: Tipo): TipoRetorno
//--------------------------------------------------------------------------------------------------------------

function calcularHipotenusa(catetoA: number, catetoB: number): number {
    // Math.sqrt devuelve un number
    return Math.sqrt((catetoA * catetoA) + (catetoB * catetoB)); 
}

//--------------------------------------------------------------------------------------------------------------
// Funciones de flecha (Arrow Functions)
// Modernizan la sintaxis y manejan el contexto de this de forma léxica (lo heredan del padre),
// a diferencia de las funciones tradicionales.
//--------------------------------------------------------------------------------------------------------------

// Definición del tipo de la función (Firma)
type Comparador = (a: number, b: number) => boolean;

// Implementación
const esMayor: Comparador = (a, b) => {
    return a > b;
};

// Se usa la función para evitar el warning "esMayor is declared but its value is never read"
console.log(calcularHipotenusa(3, 4));
console.log(`5 es mayor que 3: ${esMayor(5, 3)}`);

//--------------------------------------------------------------------------------------------------------------
// Parámetros por defecto y parámetros opcionales
// TypeScript nos permite flexibilizar la firma de la función sin perder seguridad.
// Opcionales (?): Deben ir al final.
// Por defecto (=): Se usan si el argumento es undefined.
//--------------------------------------------------------------------------------------------------------------

function crearLog(mensaje: string, nivel: string = "INFO", fecha?: Date): void {
    const timestamp = fecha ? fecha.toISOString() : new Date().toISOString();
    console.log(`[${timestamp}] [${nivel}]: ${mensaje}`);
}

// Llamadas válidas:
crearLog("Servidor iniciado"); 
crearLog("Error de conexión", "ERROR");

export {};
