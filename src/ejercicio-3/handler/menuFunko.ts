// import { number } from "yargs";
import { Funko } from "../entities/funko.js";
import { GeneroFunko } from "../enumerables/genero_funko_enum.js";
import { TipoFunko } from "../enumerables/tipo_funko_enum.js";
import { ManejadorJSON } from "./manejadorJSON.js";
import fs from 'fs';
import chalk from "chalk";
import yargs from 'yargs';
import { hideBin } from "yargs/helpers";

/**
 * Clase que modela el comportamiento de un menú de Funko
 */
export class MenuFunko {

    /**
     * Método encargado de contruir el objeto Funko a partir de los argumentos pasados por línea de comandos
     * y agregarlo al archivo JSON
     * @param nombreUsuario nombre del usuario que ejecuta el programa
     * @param id identificador del Funko
     * @param nombre nombre del Funko
     * @param descripcion descripción del Funko
     * @param tipo tipo de Funko
     * @param genero genero de Funko
     * @param franquicia franquicia a la que pertenece el Funko
     * @param numero numero dentro de la franquicia
     * @param exclusivo es exclusivo o no
     * @param caracteristica_especial característica especial del Funko
     * @param valor_mercado valor de mercado del Funko
     */
    static agregarFunko(nombreUsuario: string, id: number, nombre: string, descripcion: string, tipo: TipoFunko, genero: GeneroFunko, franquicia: string, numero: number, exclusivo: boolean, caracteristica_especial: string, valor_mercado: number) {
        const funko = new Funko(id, nombre, descripcion, tipo, genero, franquicia, numero, exclusivo, caracteristica_especial, valor_mercado);
        const filePath = './db/' + nombreUsuario + '/' + String(funko.id) + '.json';
        if (!fs.existsSync('./db/' + nombreUsuario)) {
            ManejadorJSON.crearDirectorio('./db/' + nombreUsuario); 
        }
        if (fs.existsSync(filePath)) {
            console.log(`failed:${funko.id}`)
        } else {
            ManejadorJSON.crearJSON(filePath, funko);
            console.log(`success:${funko.id}`)
        }
    }

    /**
     * Método encargado de eliminar un Funko del archivo JSON
     * @param nombreUsuario nombre del usuario que ejecuta el programa
     * @param id identificador del Funko
     * @param nombre nombre del Funko
     * @param descripcion descripción del Funko
     * @param tipo tipo de Funko
     * @param genero genero de Funko
     * @param franquicia franquicia a la que pertenece el Funko
     * @param numero numero dentro de la franquicia
     * @param exclusivo es exclusivo o no
     * @param caracteristica_especial característica especial del Funko
     * @param valor_mercado valor de mercado del Funko
     */
    static modificarFunko(nombreUsuario: string, id: number, nombre: string, descripcion: string, tipo: TipoFunko, genero: GeneroFunko, franquicia: string, numero: number, exclusivo: boolean, caracteristica_especial: string, valor_mercado: number) {
        const funko = new Funko(id, nombre, descripcion, tipo, genero, franquicia, numero, exclusivo, caracteristica_especial, valor_mercado);
        const filePath = './db/' + nombreUsuario + '/' + String(funko.id) + '.json';

        if (fs.existsSync(filePath)) {
            ManejadorJSON.crearJSON(filePath, funko);
            console.log(`success:${funko.id}`)
        } else {
            console.log(`failed:${funko.id}`)
        }
    }

    /**
     * Método encargado de eliminar un Funko del archivo JSON
     * @param nombreUsuario nombre del usuario que ejecuta el programa
     * @param id identificador del Funko
     */
    static eliminarFunko(nombreUsuario: string, id: number) {
        const filePath = './db/' + nombreUsuario + '/' + String(id) + '.json';
        if (fs.existsSync(filePath)) {
            ManejadorJSON.eliminarJSON(filePath);
            console.log(`success:${id}`)
        } else {
            console.log(`failed:${id}`)
        }
    }

    /**
     * Método encargado de listar todos los Funkos del archivo JSON
     * @param nombreUsuario nombre del usuario que ejecuta el programa
     */
    static listarFunkos(nombreUsuario: string) {
        const files = fs.readdirSync('./db/' + nombreUsuario + '/');
        files.forEach(file => {
            const funkoJSON = ManejadorJSON.leerJSON('./db/' + nombreUsuario + '/' + file);
            console.log(chalk.bgBlack.white.bold('------------------------------------'));
            if (funkoJSON !== undefined) {
                const funko = new Funko(funkoJSON._id, funkoJSON._nombre, funkoJSON._descripcion, funkoJSON._tipo, funkoJSON._genero, funkoJSON._franquicia, funkoJSON._numero, funkoJSON._exclusivo, funkoJSON._caracteristica_especial, funkoJSON._valor_mercado);
                console.log(funko.toString());
            }
        });
    }

    /**
     * Método encargado de mostrar un Funko del archivo JSON, según su id
     * @param nombreUsuario nombre del usuario que ejecuta el programa
     * @param id identificador del Funko
     */
    static mostrarFunko(nombreUsuario: string, id: number) {
        const filePath = './db/' + nombreUsuario + '/' + String(id) + '.json';
        if (fs.existsSync(filePath)) {
            const funkoJSON = ManejadorJSON.leerJSON(filePath);
            if (funkoJSON !== undefined) {
                const funko = new Funko(funkoJSON._id, funkoJSON._nombre, funkoJSON._descripcion, funkoJSON._tipo, funkoJSON._genero, funkoJSON._franquicia, funkoJSON._numero, funkoJSON._exclusivo, funkoJSON._caracteristica_especial, funkoJSON._valor_mercado);
                console.log('success:' + funko.toString());
            }
        } else {
            console.log(`failed:${id}`)
        }
    }

    /**
     * Método encargado de controlar los argumentos de la línea de comandos
     * para mandar a llamar los métodos de la clase
     */
    static controladorMenuFunko(args: string[]) {
        yargs(hideBin(args))
            .command('add', 'Añadir a un funko a la colección del usuario', {
                user: {
                    description: 'Nombre del usuario',
                    type: 'string',
                    demandOption: true
                },
                id: {
                    description: 'Funko ID',
                    type: 'number',
                    demandOption: true
                },
                nombre: {
                    description: 'Nombre del funko',
                    type: 'string',
                    demandOption: true
                },
                descripcion: {
                    description: 'Descripción del funko',
                    type: 'string',
                    demandOption: true
                },
                tipo: {
                    description: 'Tipo del funko',
                    type: 'string',
                    demandOption: true
                },
                genero: {
                    description: 'Género del funko',
                    type: 'string',
                    demandOption: true
                },
                franquicia: {
                    description: 'Franquicia del funko',
                    type: 'string',
                    demandOption: true
                },
                numero: {
                    description: 'Número del funko',
                    type: 'number',
                    demandOption: true
                },
                exclusivo: {
                    description: 'Exclusivo del funko',
                    type: 'boolean',
                    demandOption: true
                },
                caracteristica_especial: {
                    description: 'Característica especial del funko',
                    type: 'string',
                    demandOption: true
                },
                valor_mercado: {
                    description: 'Valor de mercado del funko',
                    type: 'number',
                    demandOption: true
                }
            }, (argv) => {
                this.agregarFunko(argv.user, argv.id, argv.nombre, argv.descripcion, argv.tipo as TipoFunko, argv.genero as GeneroFunko, argv.franquicia, argv.numero, argv.exclusivo, argv.caracteristica_especial, argv.valor_mercado);
            })
            .command('list', 'Lista todos los funkos de un usurio', {
                user: {
                    description: 'Nombre del usuario',
                    type: 'string',
                    demandOption: true
                }
            }, (argv) => {
                this.listarFunkos(argv.user);
            })
            .command('update', 'Modificar un funko existente', {
                user: {
                    description: 'Nombre del usuario',
                    type: 'string',
                    demandOption: true
                },
                id: {
                description: 'Funko ID',
                type: 'number',
                demandOption: true
                },
                nombre: {
                    description: 'Nombre del funko',
                    type: 'string',
                    demandOption: true
                },
                descripcion: {
                    description: 'Descripción del funko',
                    type: 'string',
                    demandOption: true
                },
                tipo: {
                    description: 'Tipo del funko',
                    type: 'string',
                    demandOption: true
                },
                genero: {
                    description: 'Género del funko',
                    type: 'string',
                    demandOption: true
                },
                franquicia: {
                    description: 'Franquicia del funko',
                    type: 'string',
                    demandOption: true
                },
                numero: {
                    description: 'Número del funko',
                    type: 'number',
                    demandOption: true
                },
                exclusivo: {
                    description: 'Exclusivo del funko',
                    type: 'boolean',
                    demandOption: true
                },
                caracteristica_especial: {
                    description: 'Característica especial del funko',
                    type: 'string',
                    demandOption: true
                },
                valor_mercado: {
                    description: 'Valor de mercado del funko',
                    type: 'number',
                    demandOption: true
                }
            }, (argv) => {
                this.modificarFunko(argv.user, argv.id, argv.nombre, argv.descripcion, argv.tipo as TipoFunko, argv.genero as GeneroFunko, argv.franquicia, argv.numero, argv.exclusivo, argv.caracteristica_especial, argv.valor_mercado);
            })
            .command('read', 'Muestra un funko especifico según su id', {
                user: {
                    description: 'Nombre del usuario',
                    type: 'string',
                    demandOption: true
                },
                id: {
                description: 'Funko ID',
                type: 'number',
                demandOption: true
                }
            }, (argv) => {
                this.mostrarFunko(argv.user, argv.id);
            })
            .command('delete', 'Elimina un funko de la colección del usuario', {
                user: {
                    description: 'Nombre del usuario',
                    type: 'string',
                    demandOption: true
                },
                id: {
                description: 'Funko ID',
                type: 'number',
                demandOption: true
                }
            }, (argv) => {
                this.eliminarFunko(argv.user, argv.id);
            })
            .help()
            .argv;
    }

 
}