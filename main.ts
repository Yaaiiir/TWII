// Importa el archivo de estilos CSS globales para la interfaz
import "./style.css";

// Importa la función que construye e inicializa toda la interfaz del sistema universitario
import { inicializarInterfaz } from "./topics/Funciones";

// Obtiene la referencia al contenedor principal del HTML donde se insertará toda la interfaz.
// El selector "#app" apunta a un <div id="app"></div> definido en index.html.
// El operador "!" indica a TypeScript que este elemento NO será null.
const app = document.querySelector<HTMLDivElement>("#app")!;

// Llama a la función que genera todos los elementos visuales y funcionalidades del sistema,
// enviando como parámetro el div principal donde se renderizará la interfaz.
inicializarInterfaz(app);
