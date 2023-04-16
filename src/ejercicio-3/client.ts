import chalk from 'chalk';
import net from 'net';

/**
 * Clase Cliente que se encarga de enviar un mensaje al servidor
 * y mostrar por pantalla el resultado de la operación
 */
class Cliente {
    public mensaje: any;
    /**
     * Se crea un socket que se conecta al servidor,
     * se toman los argumentos de la línea de comandos
     * y se envía un mensaje al servidor con el comando
     * y los argumentos
     * La respuesta del servidor se almacena en una variable
     * y se muestra por pantalla cuando el servidor cierra la conexión
     * @param socket Socket que se conecta al servidor
     */
    constructor(public socket = net.connect({port: 60300})) {

        let argumentos: string[] = []
        for (let i = 3; i < process.argv.length; i++) {
            argumentos.push(process.argv[i])
        }

        this.socket.write(JSON.stringify({'comando': process.argv[2], 'args': argumentos}) + "\n")
        let wholeData = '';
        this.socket.on('data', (dataChunk) => {
            wholeData += dataChunk;
            let messageLimit = wholeData.indexOf('\n');
            if (messageLimit !== -1) {
                this.mensaje = JSON.parse(wholeData.substring(0, messageLimit).toString());
                wholeData = wholeData.substring(messageLimit + 1);
                this.socket.end();
            }
        });


        this.socket.on('end', () => {
            if (this.mensaje.requestType === 'add') {
                if (this.mensaje.success === 'success') {
                    console.log(chalk.green(`Funko ${this.mensaje.idFunko} agregado correctamente`))
                } else {
                    console.log(chalk.red(`Funko ${this.mensaje.idFunko} no agregado`))
                }
            } else if (this.mensaje.requestType === 'update') {
                if (this.mensaje.success === 'success') {
                    console.log(chalk.green(`Funko ${this.mensaje.idFunko[0]} actualizado correctamente`))
                } else {
                    console.log(chalk.red(`Funko ${this.mensaje.idFunko[0]} no actualizado`))
                }
            } else if (this.mensaje.requestType === 'delete') {
                if (this.mensaje.success === 'success') {
                    console.log(chalk.green(`Funko ${this.mensaje.idFunko[0]} eliminado correctamente`))
                } else {
                    console.log(chalk.red(`Funko ${this.mensaje.idFunko[0]} no eliminado`))
                }
            } else if (this.mensaje.requestType === 'read') {
                if (this.mensaje.success === 'success') {
                    console.log(this.mensaje.request)
                } else {
                    console.log(chalk.red(`Funko ${this.mensaje.request} no leido`))
                }
            } else if (this.mensaje.requestType === 'list') {
                console.log(this.mensaje.request)
            } else if (this.mensaje.requestType === 'error'){
                console.log(chalk.red(`${this.mensaje.request}`))
            }
        })

        this.socket.on('error', (error) => {
            console.log(`Connection closed due to error: ${error}`);
        });
    }


}
const client = new Cliente();
