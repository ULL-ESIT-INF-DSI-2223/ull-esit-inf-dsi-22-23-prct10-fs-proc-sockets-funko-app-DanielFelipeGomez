import { spawn } from 'child_process';
import net from 'net';

/**
 * Clase InformacionFicheroPipe que se encarga de mostrar la información de un fichero
 * creando un ChildProcess con spawn y acumulando la salida estándar del proceso hijo
 * en una variable, para luego mostrarla por pantalla
 */
class InformacionFichero {
    public out = '';
    public mensaje: any;
    /**
     * Constructor de la clase InformacionFicheroPipe
     * donde se toman los argumentos de la línea de comandos
     * y se crea un ChildProcess con spawn, su salida se va
     * acumulando en una variable y se muestra por pantalla
     * cuando el proceso hijo termina
     */
    constructor() {

        for (let i = 2; i < process.argv.length - 1; i++) {
            const comando = spawn('wc', [process.argv[i], process.argv[process.argv.length - 1]])
            comando.stdout.on('data', (piece) => this.out += piece);
            comando.on('error', (error) => {
                console.log(error)
            })
            comando.on('close', () => {
                if (process.argv[i] === '-l') {
                    console.log(`Lineas: ${this.out}`)
                } else if (process.argv[i] === '-w') {
                    console.log(`Palabras: ${this.out}`)
                } else if (process.argv[i] === '-c') {
                    console.log(`Caracteres: ${this.out}`)
                } else {
                    console.log(`Comando incorrecto: ${process.argv[i]}`)
                }
                this.out = '';
            })
        }
    }

}

const client = new InformacionFichero();
