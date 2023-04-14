import chalk from 'chalk';
import net from 'net';


class Cliente {
    public mensaje: any;
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
                // console.log(this.mensaje.request)
                this.socket.end();
            }
        });


        this.socket.on('end', () => {
            console.log(`--->${this.mensaje.success}<---`)
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
                if (this.mensaje.success === 'success') {
                    console.log(chalk.green(this.mensaje.request))
                } else {
                    console.log(chalk.red(`Funkos no leidos`))
                }
            }
        })
    }


}
const client = new Cliente();
