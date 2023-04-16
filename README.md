# Práctica 10 - APIs asíncronas de gestión del sistema de ficheros, creación de procesos y creación de sockets de Node.js
## Desarrollado por Daniel Felipe Gomez Aristizabal

## Indice

1. [Introducción](#introducción)

2. [Hablemos de Sockets](#hablemos-de-sockets)

3. [Ejercicio 1](#ejercicio-1)

4. [Ejercicio 2](#ejercicio-2)

5. [Ejercicio 3](#ejercicio-3)

6. [Ejercicio PE](#ejercicio-pe)

7. [Conclusiones](#conclusiones)

8. [Referencias](#referencias)

## Introducción

En presente práctica se pretende mejorar el manejo de ficheros y aprender a crear procesos y sockets en Node.js. Para ello se realizarán tres ejercicios que se explicarán a continuación. Previamente a hacer esta práctica hice el ejercicio del PE, considero que gracias al estrés que pasé en ese ejercicio, el desarrollo de los demás fue relativamente fluido.


## Hablemos de Sockets

Los Sockets a lo largo de la carrera siempre fue un tema que evite bastante, en definitiva en esta asignatura se tiene una visión más útil de los mismos y su manipulación es relativamente menos compleja, ya que en otras ocasiones se nos hacia elegir hasta los protocolos de transferencia. 

Para poder entenderlos un poco me fue util hacer uso de los apuntes de la asignatura [Sockets](https://ull-esit-inf-dsi-2223.github.io/nodejs-theory/nodejs-sockets.html), además de luchar un buen rato con el código para intentar entenderlo. Al final una vez que se controla el hecho de pasar la información de un lado a otro sin muchos problemas, es cuestión de ir probando y añadiendo los elementos que nos interesan.


## Ejercicio 1

Se nos pide considera el siguiente código:

```ts
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```

Para entender un poco mejor como funciona la ejecución de elementos sincronos y asincronos, es util hacer una traza de la ejecución del código:

1. Se importan los elementos necesarios para el ejercicio.

2. Se comprueba que se ha pasado un argumento, en caso contrario se muestra un mensaje de error.

3. Se comprueba que el archivo existe, en caso contrario se muestra un mensaje de error.

4. Se muestra un mensaje de que se ha iniciado la observación del archivo.

5. Se crea un watcher para el archivo.

6. El watcher queda pendiente a los cambios que ocurran en el archivo.

7. Se muestra un mensaje de que el archivo ya no se está observando.

8. En el momento que ocurra un cambio en el archivo, se muestra un mensaje de que el archivo ha sido modificado.

9. El paso anterior continua hasta que se detenga la ejecución del programa.

Si ahora lo vemos de forma más detallada, pensando a nivel de las estructuras de datos, podemos ver que el código se ejecuta de la siguiente forma:

1. A la pila de llamadas se añade el console.log('Starting to watch file ${filename}');.

2. Se ejecuta el console.log('Starting to watch file ${filename}');.

3. Se añade el watcher.on('change', () => {console.log(`File ${filename} has been modified somehow`);}); a la pila de llamadas.

4. Se debe añadir el watcher.on('change', () => {console.log(`File ${filename} has been modified somehow`);}); al registro de eventos de ka API.

5. Se añade el console.log(`File ${filename} is no longer watched`); a la pila de llamadas.

6. Se ejecuta el console.log(`File ${filename} is no longer watched`);.

7. Cuando se produce un cambio en el archivo, se añade el console.log(`File ${filename} has been modified somehow`); a la cola de manejadores.

8. Cuando se encuentra vacía la pila de llamadas, se ejecuta el watcher.on('change', () => {console.log(`File ${filename} has been modified somehow`);});.

9. Se ejecuta el console.log(`File ${filename} has been modified somehow`);.

10. El paso 7-9 se repite hasta que se detiene la ejecución del programa.

## Ejercicio 2

En el ejercicio 2 debíamos desarrollar un programa que nos diera información de un fichero dado por parámetro. Para ello se nos pide que el programa sea capaz de:

- Mostrar el número de líneas del fichero.

- Mostrar el número de palabras del fichero.

- Mostrar el número de caracteres del fichero.

Esta información la pide el usuario mediante línea de comandos y puede pedir solo una de las opciones o todas. Debemos conseguir dicho funcionamiento haciendo uso de **pipes** para una versión del programa y otra sin usar **pipes**.

### Versión con pipes

```ts	
import { spawn } from 'child_process';
import net from 'net';

class InformacionFicheroPipe {
    public out = '';
    public mensaje: any;
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

```

Como podemos ver hice una clase bastante sencilla la cual en su constructor recorre los argumentos pasados por el usuario y para cada uno prueba a crear un **ChildProcess**, en caso de que el comando sea correcto, se ejecuta y se muestra la información por pantalla, esto redirige la salida del comando a la salida estándar del proceso padre, en este caso la consola. En caso de que el comando sea incorrecto, se muestra un mensaje de error, con el comando que ha fallado.

Simplemente destacar que el fichero hice que recorra desde el segundo argumentos hasta el penúltimo, ya que el último argumento es el fichero que se quiere analizar, y para cada uno voy creando un **ChildProcess** del comando **wc** con la respectiva opción recuperada de la linea de comandos. También mencionar que añadí un bloque de **if else** para controlar las 3 opciones que se pueden pasar por línea de comandos, en caso de que no sea ninguna de las 3, se muestra un mensaje de error. 

### Versión sin pipes

```ts
import { spawn } from 'child_process';
import net from 'net';

class InformacionFichero {
    public out = '';
    public mensaje: any;
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

```

Nuevamente desarrolle una clase sencilla, que en el constructor se encarga de generar un **ChildProcess** para cada uno de los argumentos pasados por el usuario. En este caso hace seguimiento al evento **data** del **stdout** del **ChildProcess**, para ir guardando la salida del comando en una variable. Cuando el proceso termina se emite el evento **close**, en el manejador de este evento se encarga de mostrar la información por pantalla, en caso de que el comando sea incorrecto, se muestra un mensaje de error, con el comando que ha fallado.

En definitiva haciendo uso de los manejadores es mucho más manipulable la información que conseguimos de un proceso hijo, ya que podemos ir guardando la información en una variable y cuando el proceso termine, podemos hacer lo que queramos con esa información, en este caso mostrarla por pantalla.

## Ejercicio 3

Para el último ejercicio de la práctica, debíamos desarrollar un programa que se apoyaba de la práctica anterior de FunkoPop, la idea era crear un sistema cliente-servidor que nos permitiera consultar la información de los FunkoPops que tenemos en la base de datos, de la misma forma que lo hacíamos en la práctica anterior, pero esta vez a través de un servidor.

Para conseguir esto, desarrolle una clase Servidor y otra Cliente, para establecer la comunicación entre ambos.

### Servidor

```ts
import net from 'net';
import {watchFile} from 'fs';
import {spawn} from 'child_process';
import { TipoPregunta } from './types/tipo_pregunta.js';


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

```

En el constructor de la clase Servidor, se crea un servidor, que se encarga de escuchar en el puerto 60300. 

Añadí un manejador de eventos para el evento **data**, que se encarga de recibir los comandos que le envía el cliente, seguí para esto la lógica ya usada en otros ejercicios de la práctica, donde el final del mensaje viene indicado por un salto de línea **\n**. Una vez comprobado que el comando hace parte de los que controla la aplicación, se crea un **ChildProcess** que se encarga de ejecutar el programa **index.js** de la práctica anterior, con el comando y los argumentos que le envía el cliente.

Para lo anterior tuve que modificar un poco el funcionamiento de la practica anterior, definiendo que ahora los comandos los pasaría yo como una **string** y no los tomaría directamente el programa de la línea de comandos.

Controlé el evento **data** del **stdout** del **ChildProcess**, para ir guardando la salida del comando en una variable, cuando el proceso termina se emite el evento **close**, en el manejador de este evento se emite un evento **request**, en el manejador de dicho evento se encarga de enviar la información al cliente, en caso de que el comando sea incorrecto, se envía un mensaje de error, con el comando que ha fallado.

### Cliente

```ts
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

```

En el contructor del Cliente defino que se conecte al puerto 60300. Mando por el Socket el comando y los argumentos que recibo por la línea de comandos. A continuación, controlé el evento **data**, que se encarga de recibir la información que envía el servidor, en este caso, la información que envía el servidor es un **JSON** con la información del comando que se ejecutó, por lo que lo parseo y lo guardo en una variable. Una vez que se recibe el mensaje completo, se emite el evento **end**.

En el manejador del evento **end**, se encarga de imprimir por pantalla la información que se ha recibido del servidor, es aquí donde se añade el color de la salida haciendo uso de la librería **chalk**.

Se incluyen todos los manejadores necesarios para el control de errores.


## Ejercicio PE

Para finalizar la práctica, explicaré brevemente el ejercicio solicitado en la clase PE, se debía desarrollar un sistema cliente-servidor donde el cliente solicitará al servidor la ejecución de un comando, el servidor ejecutará el comando y devolverá la salida al cliente.

Este ejercicio es sin duda el ejercicio que más me ha costado de toda la parte PE de la asignatura, en algún momento pensé que no lo iba a poder hacer y pensé en retirarme, pero por fortuna, al final conseguí que funcionara, definitivamente no es mi mejor código, pero me salvó de un suspenso.

### Servidor

```ts
import net from 'net';
import {watchFile} from 'fs';
import {spawn} from 'child_process';


net.createServer((connection) => {
  console.log('A client has connected.');

  let wholeData = '';
  connection.on('data', (comando) => {
    wholeData += comando;

    let messageLimit = wholeData.indexOf('\n');
    while (messageLimit !== -1) {
      const message = JSON.parse(wholeData.substring(0, messageLimit).toString());
      wholeData = wholeData.substring(messageLimit + 1);
      const cat = spawn(message.comando, message.args);
      cat.stdout.pipe(process.stdout);
      let out = ''
      cat.stdout.on('data', (piece) => out += piece);
      cat.on('close', () => {
        connection.write(JSON.stringify({'salida': out}) + "\n")
      })
      messageLimit = wholeData.indexOf('\n');
    }
  })

  connection.on('close', () => {
    console.log('A client has disconnected.');
  });
}).listen(60300, () => {
  console.log('Waiting for clients to connect.');
});

```

Para el servidor cree un server y dentro añadí un manejador del evento **data** donde reuní toda la información que me pasaba el cliente y mediante un salto de línea, separamos los comandos que nos envía el cliente. Una vez que tenemos el comando, creamos un **Child Process** que ejecutará el comando y los argumentos que nos envía el cliente. La salida del comando la vamos guardando en una variable y cuando el proceso hijo se cierre, enviamos la salida al cliente en modo JSON.

### Cliente

```ts
import net from 'net';

const client = net.connect({port: 60300});

let lista = []
for (let i = 3; i < process.argv.length; i++) {
  lista.push(process.argv[i])
}


client.write(JSON.stringify({'comando': process.argv[2], 'args': lista}) + "\n")

let wholeData = '';
client.on('data', (dataChunk) => {
  wholeData += dataChunk;

  let messageLimit = wholeData.indexOf('\n');
    while (messageLimit !== -1) {
      const message = JSON.parse(wholeData.substring(0, messageLimit).toString());
      wholeData = wholeData.substring(messageLimit + 1);
      console.log(message.salida)
      messageLimit = wholeData.indexOf('\n');
    }
});

client.on('end', () => {
  const message = JSON.parse(wholeData);
});

```

Por la parte del cliente, nos conectamos al puerto 60300 y enviamos el comando y los argumentos que nos pasan por la línea de comandos en modo JSON. Luego a través de un manejador del evento **data**, vamos recibiendo la información que nos envía el servidor y la vamos guardando en una variable. Una vez que tenemos toda la información, la parseamos y la imprimimos por pantalla.


## Conclusiones

Esta ha sido una practica que en todo momento pensé en renunciar a ella, debido a que tengo muy poco tiempo por tema trabajo y clases, pero al final conseguí sacar el tiempo sufiente para hacerla, aunque debo reconocer que no es mi mejor código, pero me ha servidor para aprender a usar los sockets y distintos eventos que se pueden usar.

Sobretodo destacar el miedo que tuve en la hora del PE, donde hasta los últimos diez minutos, nada me funcionaba, me sentía muy frustrado, pero al final debo admitir que eso me permitió aprender bastante del funcionamiento que luego me ayudo a hacer toda la práctica mucho más rapido.

## Referencias

- [Sockets](https://ull-esit-inf-dsi-2223.github.io/nodejs-theory/nodejs-sockets.html)










