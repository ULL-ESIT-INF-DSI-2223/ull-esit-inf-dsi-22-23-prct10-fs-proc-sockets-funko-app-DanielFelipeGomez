import net from 'net';
import {watchFile} from 'fs';
import {spawn} from 'child_process';


class Servidor {
    public out = '';
    public mensaje: any;
    public outColor = '';
    constructor(public server = net.createServer((connection) => {
        console.log('A client has connected.');

        let wholeData = '';

        connection.on('data', (comando) => {
            wholeData += comando;
            let messageLimit = wholeData.indexOf('\n');
            while (messageLimit !== -1) {
                this.mensaje = JSON.parse(wholeData.substring(0, messageLimit).toString());
                wholeData = wholeData.substring(messageLimit + 1);
                // MenuFunko.controladorMenuFunko([message.comando, ...message.args]);
                // const comando = spawn('node dist/index.js', [message.comando, ...message.args]);

                const comando = spawn('node', ['dist/ejercicio-3/index.js', this.mensaje.comando, ...this.mensaje.args]);
                comando.stdout.pipe(process.stdout);
                comando.stdout.on('data', (piece) => this.out += piece);
                comando.on('close', () => {
                    connection.emit('request');               
                })
                // console.log(message.comando)
                // console.log(message.args)
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
                connection.write(JSON.stringify({'requestType': this.mensaje.comando, 'success': this.out.split(':')[0], 'request': this.out.split(':')[1]}) + "\n")
            } else if (this.mensaje.comando === 'list') {
                connection.write(JSON.stringify({'requestType': this.mensaje.comando, 'request': this.out}) + "\n")
            }
            this.out = '';
        })

        connection.on('close', () => {
                console.log('A client has disconnected.');
        });
    }).listen(60300, () => {
        console.log('Waiting for clients to connect.');
    })) {
    }
}

const server = new Servidor();