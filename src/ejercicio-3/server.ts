import net from 'net';
import {watchFile} from 'fs';
import {spawn} from 'child_process';
import { TipoPregunta } from './types/tipo_pregunta.js';

/**
 * Clase Servidor que se encarga de crear un servidor
 * que escucha en el puerto 60300 y que recibe comandos
 * para añadir, actualizar, borrar, leer y listar Funkos
 * de la base de datos
 */
class Servidor {
    public out = '';
    public mensaje: any;
    /**
     * Se crea un servidor que escucha en el puerto 60300
     * y que recibe comandos para añadir, actualizar, borrar,
     * leer y listar Funkos de la base de datos
     * @param server 
     */
    constructor(public server = net.createServer((connection) => {
        console.log('A client has connected.');

        let wholeData = '';

        connection.on('data', (comando) => {
            wholeData += comando;
            let messageLimit = wholeData.indexOf('\n');
            while (messageLimit !== -1) {
                this.mensaje = JSON.parse(wholeData.substring(0, messageLimit).toString());
                wholeData = wholeData.substring(messageLimit + 1);
                if (this.mensaje.comando !== 'add' && this.mensaje.comando !== 'update' && this.mensaje.comando !== 'delete' && this.mensaje.comando !== 'read' && this.mensaje.comando !== 'list') {
                    connection.write(JSON.stringify({'requestType': 'error', 'success': 'error', 'request': 'Comando no reconocido'}) + "\n")
                }
                const comando = spawn('node', ['dist/ejercicio-3/index.js', this.mensaje.comando, ...this.mensaje.args]);
                comando.stdout.on('data', (piece) => this.out += piece);
                comando.on('close', () => {
                    connection.emit('request');               
                })
                messageLimit = wholeData.indexOf('\n');
            }
        })

        connection.on('request', () => {
            if (this.mensaje.comando === 'add') {
                connection.write(JSON.stringify({'requestType': this.mensaje.comando, 'success': this.out.split(':')[0], 'idFunko': this.out.split(':')[1]}) + "\n")
            } else if (this.mensaje.comando === 'update') {
                connection.write(JSON.stringify({'requestType': this.mensaje.comando, 'success': this.out.split(':')[0], 'idFunko': this.out.split(':')[1]}) + "\n")
            } else if (this.mensaje.comando === 'delete') {
                connection.write(JSON.stringify({'requestType': this.mensaje.comando, 'success': this.out.split(':')[0], 'idFunko': this.out.split(':')[1]}) + "\n")
            } else if (this.mensaje.comando === 'read') {
                connection.write(JSON.stringify({'requestType': this.mensaje.comando, 'success': this.out.split(':')[0], 'request': this.out}) + "\n")
            } else if (this.mensaje.comando === 'list') {
                connection.write(JSON.stringify({'requestType': this.mensaje.comando, 'request': this.out}) + "\n")
            }
            this.out = '';
        })

        connection.on('close', () => {
                console.log('A client has disconnected.');
        });

        connection.on('error', (error) => {
            console.log(`Connection closed due to error: ${error}`);
        });


    }).listen(60300, () => {
        console.log('Waiting for clients to connect.');
    })) {
    }
}

const server = new Servidor();