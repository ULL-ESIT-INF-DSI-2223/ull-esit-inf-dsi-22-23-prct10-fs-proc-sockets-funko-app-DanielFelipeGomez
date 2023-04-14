import { GeneroFunko } from "../enumerables/genero_funko_enum.js"
import { TipoFunko } from "../enumerables/tipo_funko_enum.js"

/**
 * Interfaz que representa el comportamiento de un Funko
 */
export interface FunkoInterface {
    id: number,
    nombre: string,
    descripcion: string,
    tipo: TipoFunko,
    genero: GeneroFunko,
    franquicia: string,
    numero: number,
    exclusivo: boolean,
    caracteristica_especial: string,
    valor_mercado: number
}