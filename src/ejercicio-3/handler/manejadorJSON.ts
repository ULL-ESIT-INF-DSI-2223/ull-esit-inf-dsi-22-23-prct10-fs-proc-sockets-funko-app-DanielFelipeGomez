import fs from 'fs';
import { FunkoJSONInterface } from '../interfaces/funko_json_interface.js';
import chalk from 'chalk';

/**
 * Clase que define las distintas operaciones que se pueden realizar con un archivo JSON
 */
export class ManejadorJSON {
    /**
     * Constructor privado para evitar instanciar la clase
     */
    private constructor() { }

    /**
     * Método estático encargado de crear un directorio
     * @param nombreDirectorio nombre del directorio a crear
     */
    static crearDirectorio(nombreDirectorio: string) { // './db/HolaMundo'
        try {
            if (!fs.existsSync(nombreDirectorio)) {
                fs.mkdirSync(nombreDirectorio);
            }
        } catch (error) {
            console.error(chalk.red(`Se ha producido un error al crear el directorio ${nombreDirectorio}: ${error.message}`));
        }
    }

    /**
     * Método estático encargado de crear un archivo JSON
     * @param nombreArchivo nombre del archivo a crear
     * @param contenido contenido del archivo a crear
     */
    static agregarLineaJSON(nombreArchivo: string, contenido: object) {
        try {
            if (!fs.existsSync(nombreArchivo)) {
                fs.writeFileSync(nombreArchivo, JSON.stringify(contenido));
            } else {
                const nuevaLinea = JSON.stringify(contenido);
                let contenidoAntiguo = fs.readFileSync(nombreArchivo, 'utf-8');
                fs.writeFileSync(nombreArchivo, contenidoAntiguo + ',\n' + nuevaLinea);
            }
        } catch (error) {
            console.error(chalk.red(`Se ha producido un error al crear el archivo ${nombreArchivo}: ${error.message}`));
        }
    }

    /**
     * Método estático encargado de crear un archivo JSON
     * @param nombreArchivo nombre del archivo a crear
     * @param contenido contenido del archivo a crear
     */
    static crearJSON(nombreArchivo: string, contenido: object) {
        try {
            if (!fs.existsSync(nombreArchivo)) {
                fs.writeFileSync(nombreArchivo, JSON.stringify(contenido));
            } else {
                fs.writeFileSync(nombreArchivo, JSON.stringify(contenido));
            }
        } catch (error) {
            console.error(chalk.red(`Se ha producido un error al crear el archivo ${nombreArchivo}: ${error.message}`));
        }
    }

    /**
     * Método estático encargado de eliminar un archivo JSON
     * @param nombreArchivo nombre del archivo a eliminar
     */
    static eliminarJSON(nombreArchivo: string) {
        try {
            if (fs.existsSync(nombreArchivo)) {
                fs.unlinkSync(nombreArchivo);
            }
        } catch (error) {
            console.error(chalk.red(`Se ha producido un error al eliminar el archivo ${nombreArchivo}: ${error.message}`));
        }
    }

    /**
     * Método estático encargado de leer un archivo JSON
     * @param nombreArchivo nombre del archivo a leer
     * @returns FunkoJSONInterface | undefined
     */
    static leerJSON(nombreArchivo: string): FunkoJSONInterface | undefined {
        try {
            const funkoJSON: FunkoJSONInterface = JSON.parse(fs.readFileSync(nombreArchivo, 'utf-8'));
            return funkoJSON;
        } catch (error) {
            console.error(chalk.red(`Se ha producido un error al leer el archivo ${nombreArchivo}: ${error.message}`));
        }
        return undefined;
    }

}