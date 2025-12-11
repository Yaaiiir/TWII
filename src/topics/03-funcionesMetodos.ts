//Anatomia de un de una funcion en TypeScript
// Sintaxis estándar
// (param: Tipo): TipoRetorno
export function calcularHipotenusa(catetoA: number, catetoB: number): number {
    // Math.sqrt devuelve un number
    return Math.sqrt((catetoA * catetoA) + (catetoB * catetoB)); 
}


//Funciones de flechas 
//Modernizan la sintaxis y manejan el contexto de this de forma léxica (lo heredan del padre), a diferencia de las funciones tradicionales.
// Definición del tipo de la función (Firma)
export type Comparador = (a: number, b: number) => boolean;

// Implementación
export const esMayor: Comparador = (a, b) => {
    return a > b;
};

//parametros por defectos y opcionales
//TypeScript nos permite flexibilizar la firma de la función sin perder seguridad.
// Opcionales (?): Deben ir al final.
//Por defecto (=): Se usan si el argumento es undefined.
/*export function crearLog(mensaje: string, nivel: string = "INFO", fecha?: Date): void {
    const timestamp = fecha ? fecha.toISOString() : new Date().toISOString();
    console.log(`[${timestamp}] [${nivel}]: ${mensaje}`);
}*/
export function crearLog(mensaje: string, nivel: string = "INFO", fecha?: Date): string {
    const timestamp = fecha ? fecha.toISOString() : new Date().toISOString();
    return `[${timestamp}] [${nivel}]: ${mensaje}`;
}

// Llamadas válidas:
crearLog("Servidor iniciado");
crearLog("Error de conexión", "ERROR");
crearLog("Hola mundo");

console.log(calcularHipotenusa(3, 4));

console.log(esMayor(1, 5));  


export{};