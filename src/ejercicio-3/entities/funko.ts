import { GeneroFunko } from "../enumerables/genero_funko_enum.js";
import { TipoFunko } from "../enumerables/tipo_funko_enum.js";
import { FunkoInterface } from "../interfaces/funko_interface.js";
import chalk from "chalk";


/**
 * Clase que modela el comportamiento de un Funko Pop
 */
export class Funko implements FunkoInterface {
    /**
     * Contructor de la clase
     * @param _id identificador del Funko
     * @param _nombre nombre del Funko
     * @param _descripcion descripción del Funko
     * @param _tipo tipo de Funko, es un enumerado
     * @param _genero genero de Funko, es un enumerado
     * @param _franquicia franquicia a la que pertenece el Funko
     * @param _numero numero dentro de la franquicia
     * @param _exclusivo define si el Funko es exclusivo o no
     * @param _caracteristica_especial descripción de la característica especial del Funko
     * @param _valor_mercado define el valor de mercado del Funko
     */
    constructor (protected _id: number, protected _nombre: string, protected _descripcion: string,
        protected _tipo: TipoFunko, protected _genero: GeneroFunko, protected _franquicia: string,
        protected _numero: number, protected _exclusivo: boolean, protected _caracteristica_especial: string,
        protected _valor_mercado: number) {
            if (_valor_mercado < 0) {
                throw new Error('El valor no puede ser negativo');
            }
            if (!Number.isInteger(_numero)) {
                throw new Error('El número debe ser un entero.');
            }
            if (_nombre === '' || _descripcion === '') {
                throw new Error('El nombre y la descripción no pueden estar vacíos.');
            }
        }
    
    /**
     * Método que devuelve el identificador del Funko
     */
    get id() {return this._id}

    /**
     * Método que devuelve el nombre del Funko
     */
    get nombre() {return this._nombre}

    /**
     * Método que devuelve la descripción del Funko
     */
    get descripcion() {return this._descripcion}

    /**
     * Método que devuelve el tipo del Funko
     */
    get tipo() {return this._tipo}

    /**
     * Método que devuelve el género del Funko
     */
    get genero() {return this._genero}

    /**
     * Método que devuelve la franquicia del Funko
     */
    get franquicia() {return this._franquicia}

    /**
     * Método que devuelve el número del Funko
     */
    get numero() {return this._numero}

    /**
     * Método que devuelve si el Funko es exclusivo o no
     */
    get exclusivo() {return this._exclusivo}

    /**
     * Método que devuelve la característica especial del Funko
     */
    get caracteristica_especial() {return this._caracteristica_especial}

    /**
     * Método que devuelve el valor de mercado del Funko
     */
    get valor_mercado() {return this._valor_mercado}

    /**
     * Metodo que devuelve la información del Funko en formato string
     * @returns string con la información del Funko
     */
    public toString() {
        let valorRango = '';
        if (this.valor_mercado > 200) {
            valorRango = chalk.blue.bold('Muy alto '+ this.valor_mercado + '€');
        }else if (this.valor_mercado > 100) {
            valorRango = chalk.green.bold('Alto ' + this.valor_mercado + '€');
        } else if (this.valor_mercado > 50) {
            valorRango = chalk.yellowBright.bold('Medio ' + this.valor_mercado + '€');
        } else {
            valorRango = chalk.red.bold('Bajo ' + this.valor_mercado + '€');
        }
        const exclusividad = this.exclusivo ? chalk.yellowBright.bold('EXCLUSIVO') : chalk.bold('NO EXCLUSIVO');
        return `${chalk.magentaBright.bold('Identificador:')} ${this._id},\n${chalk.magentaBright.bold('Nombre:')} ${this._nombre},\n${chalk.magentaBright.bold('Descripción:')} ${this._descripcion},\n${chalk.magentaBright.bold('Tipo:')} ${this._tipo},\n${chalk.magentaBright.bold('Genero:')} ${this._genero},\n${chalk.magentaBright.bold('Franquicia:')} ${this._franquicia},\n${chalk.magentaBright.bold('Número:')} ${this._numero},\n${chalk.magentaBright.bold('Exclusivo:')} ${exclusividad},\n${chalk.magentaBright.bold('Característica Especial:')} ${this._caracteristica_especial},\n${chalk.magentaBright.bold('Valor de Mercado:')} ${valorRango}`;
    }
    

}