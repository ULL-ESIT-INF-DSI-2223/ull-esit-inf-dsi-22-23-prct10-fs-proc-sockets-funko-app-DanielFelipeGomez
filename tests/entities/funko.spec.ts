

import 'mocha';
import {expect} from 'chai';
import {Funko} from "../../src/entities/funko.js";
import { TipoFunko } from "../../src/enumerables/tipo_funko_enum.js";
import { GeneroFunko } from "../../src/enumerables/genero_funko_enum.js";
import chalk from 'chalk';

describe('Pruebas de la clase Funko', function () {
    it('Se puede instanciar un objeto y acceder a sus propiedades', () => {
        const funko = new Funko(1, 'Iron Man', 'Marvel superhero', TipoFunko.Pop, GeneroFunko.Deportistas, 'Marvel', 1, false, '', 10.99);
        expect(funko).instanceOf(Funko);
        expect(funko.nombre).to.equal('Iron Man');
        expect(funko.descripcion).to.equal('Marvel superhero');
        expect(funko.tipo).to.equal(TipoFunko.Pop);
        expect(funko.genero).to.equal(GeneroFunko.Deportistas);
        expect(funko.franquicia).to.equal('Marvel');
        expect(funko.numero).to.equal(1);
        expect(funko.exclusivo).to.equal(false);
        expect(funko.caracteristica_especial).to.equal('');
        expect(funko.valor_mercado).to.equal(10.99);
    });

    it('Distintos rangos de valor de mercado', () => {
        const funko = new Funko(1, 'Iron Man', 'Marvel superhero', TipoFunko.Pop, GeneroFunko.Deportistas, 'Marvel', 1, false, '', 10.99);
        expect(funko).instanceOf(Funko);
        expect(funko.valor_mercado).to.equal(10.99);
        const funko2 = new Funko(1, 'Iron Man', 'Marvel superhero', TipoFunko.Pop, GeneroFunko.Deportistas, 'Marvel', 1, false, '', 52);
        expect(funko2.valor_mercado).to.equal(52);
        const funko3 = new Funko(1, 'Iron Man', 'Marvel superhero', TipoFunko.Pop, GeneroFunko.Deportistas, 'Marvel', 1, false, '', 109);
        expect(funko3.valor_mercado).to.equal(109);
        const funko4 = new Funko(1, 'Iron Man', 'Marvel superhero', TipoFunko.Pop, GeneroFunko.Deportistas, 'Marvel', 1, false, '', 205);
        expect(funko4.valor_mercado).to.equal(205);
    });

    it('No se soportan valores negativos en el precio del Funko', () => {
        expect(() => {
            new Funko(1, 'Iron Man', 'Marvel superhero', TipoFunko.Pop, GeneroFunko.Deportistas, 'Marvel', 1, false, '', -10.99);
        }).to.throw('El valor no puede ser negativo');
    });

    it("Se puede obtener un acadena con formato", () => {
        const funko = new Funko(1, "Iron Man", "Figura de Iron Man", TipoFunko.Pop, GeneroFunko.Galacticos, "Marvel", 1, true, "Luz LED en el pecho", 300)        
        let expectedString = `${chalk.magentaBright.bold('Identificador:')} 1,\n${chalk.magentaBright.bold('Nombre:')} Iron Man,\n${chalk.magentaBright.bold('Descripción:')} Figura de Iron Man,\n${chalk.magentaBright.bold('Tipo:')} Pop!,\n${chalk.magentaBright.bold('Genero:')} Galácticos de Otra Liga Rey,\n${chalk.magentaBright.bold('Franquicia:')} Marvel,\n${chalk.magentaBright.bold('Número:')} 1,\n${chalk.magentaBright.bold('Exclusivo:')} ${chalk.yellowBright.bold('EXCLUSIVO')},\n${chalk.magentaBright.bold('Característica Especial:')} Luz LED en el pecho,\n${chalk.magentaBright.bold('Valor de Mercado:')} ${chalk.blue.bold('Muy alto 300' + '€')}`;
        expect(funko.toString()).to.equal(expectedString);
        const funko2 = new Funko(1, "Iron Man", "Figura de Iron Man", TipoFunko.Pop, GeneroFunko.Galacticos, "Marvel", 1, true, "Luz LED en el pecho", 105)        
        expectedString = `${chalk.magentaBright.bold('Identificador:')} 1,\n${chalk.magentaBright.bold('Nombre:')} Iron Man,\n${chalk.magentaBright.bold('Descripción:')} Figura de Iron Man,\n${chalk.magentaBright.bold('Tipo:')} Pop!,\n${chalk.magentaBright.bold('Genero:')} Galácticos de Otra Liga Rey,\n${chalk.magentaBright.bold('Franquicia:')} Marvel,\n${chalk.magentaBright.bold('Número:')} 1,\n${chalk.magentaBright.bold('Exclusivo:')} ${chalk.yellowBright.bold('EXCLUSIVO')},\n${chalk.magentaBright.bold('Característica Especial:')} Luz LED en el pecho,\n${chalk.magentaBright.bold('Valor de Mercado:')} ${chalk.green.bold('Alto 105' + '€')}`;
        expect(funko2.toString()).to.equal(expectedString);
        const funko3 = new Funko(1, "Iron Man", "Figura de Iron Man", TipoFunko.Pop, GeneroFunko.Galacticos, "Marvel", 1, true, "Luz LED en el pecho", 55)        
        expectedString = `${chalk.magentaBright.bold('Identificador:')} 1,\n${chalk.magentaBright.bold('Nombre:')} Iron Man,\n${chalk.magentaBright.bold('Descripción:')} Figura de Iron Man,\n${chalk.magentaBright.bold('Tipo:')} Pop!,\n${chalk.magentaBright.bold('Genero:')} Galácticos de Otra Liga Rey,\n${chalk.magentaBright.bold('Franquicia:')} Marvel,\n${chalk.magentaBright.bold('Número:')} 1,\n${chalk.magentaBright.bold('Exclusivo:')} ${chalk.yellowBright.bold('EXCLUSIVO')},\n${chalk.magentaBright.bold('Característica Especial:')} Luz LED en el pecho,\n${chalk.magentaBright.bold('Valor de Mercado:')} ${chalk.yellowBright.bold('Medio 55' + '€')}`;
        expect(funko3.toString()).to.equal(expectedString);
        const funko4 = new Funko(1, "Iron Man", "Figura de Iron Man", TipoFunko.Pop, GeneroFunko.Galacticos, "Marvel", 1, true, "Luz LED en el pecho", 23)        
        expectedString = `${chalk.magentaBright.bold('Identificador:')} 1,\n${chalk.magentaBright.bold('Nombre:')} Iron Man,\n${chalk.magentaBright.bold('Descripción:')} Figura de Iron Man,\n${chalk.magentaBright.bold('Tipo:')} Pop!,\n${chalk.magentaBright.bold('Genero:')} Galácticos de Otra Liga Rey,\n${chalk.magentaBright.bold('Franquicia:')} Marvel,\n${chalk.magentaBright.bold('Número:')} 1,\n${chalk.magentaBright.bold('Exclusivo:')} ${chalk.yellowBright.bold('EXCLUSIVO')},\n${chalk.magentaBright.bold('Característica Especial:')} Luz LED en el pecho,\n${chalk.magentaBright.bold('Valor de Mercado:')} ${chalk.red.bold('Bajo 23' + '€')}`;
        expect(funko4.toString()).to.equal(expectedString);
    });

    it('No se puede crear un Funko con numero decimal', () => {
        expect(() => new Funko(1, 'Iron Man', 'Marvel superhero', TipoFunko.Pop, GeneroFunko.Deportistas, 'Marvel', 1.5, false, '', 10)).to.throw('El número debe ser un entero.');
    });

    it('No se puede crear un Funko con los valores de nombre y descripcion vacios', () => {
        expect(() => new Funko(1, '', '', TipoFunko.Pop, GeneroFunko.Deportistas, 'Marvel', 1, false, '', 10)).to.throw('El nombre y la descripción no pueden estar vacíos.');
    });

    
});
