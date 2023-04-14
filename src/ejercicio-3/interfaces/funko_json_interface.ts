import { GeneroFunko } from "../enumerables/genero_funko_enum.js";
import { TipoFunko } from "../enumerables/tipo_funko_enum.js";

/**
 * Interfaz que representa el formato JSON de un Funko
 */
export interface FunkoJSONInterface {
    _id: number,
    _nombre: string,
    _descripcion: string,
    _tipo: TipoFunko,
    _genero: GeneroFunko,
    _franquicia: string,
    _numero: number,
    _exclusivo: boolean,
    _caracteristica_especial: string,
    _valor_mercado: number
}