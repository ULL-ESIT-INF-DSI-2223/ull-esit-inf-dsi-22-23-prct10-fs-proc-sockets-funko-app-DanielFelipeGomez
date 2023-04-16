import { spawn } from 'child_process';
import net from 'net';


/**
 * Clase InformacionFicheroPipe que se encarga de mostrar la información de un fichero
 * creando un ChildProcess con spawn y redirigiendo la salida estándar del proceso hijo
 */
class InformacionFicheroPipe {
    public out = '';
    public mensaje: any;
    /**
     * Constructor de la clase InformacionFicheroPipe
     * donde se toman los argumentos de la línea de comandos
     * y se crea un ChildProcess con spawn
     */
    constructor() {

        for (let i = 2; i < process.argv.length -1; i++) {
            const comando = spawn('wc', [process.argv[i], process.argv[process.argv.length - 1]])
            if (process.argv[i] === '-l') {
                console.log('lineas')
            } else if (process.argv[i] === '-w') {
                console.log('palabras')
            } else if (process.argv[i] === '-c') {
                console.log('caracteres')
            } else {
                console.log(`Comando incorrecto: ${process.argv[i]}`)
            }
            comando.stdout.pipe(process.stdout)
            comando.on('error', (error) => {
                console.log(`Comando incorrecto: ${error}`)
            })
        }
    }

}

const client = new InformacionFicheroPipe();
