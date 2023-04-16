

import 'mocha';
import {expect} from 'chai';
import {ManejadorJSON} from "../../src/handler/manejadorJSON.js";
import fs from 'fs';
import { TipoFunko } from "../../src/enumerables/tipo_funko_enum.js";
import { GeneroFunko } from "../../src/enumerables/genero_funko_enum.js";
import chalk from 'chalk';
import { fstat } from 'fs';

describe('Pruebas de la clase ManejadorJSON', function () {
    it ('Se puede crear un directorio, si no existe previamente', () => {
        ManejadorJSON.crearDirectorio('./pruebas');
        expect(fs.existsSync('./pruebas')).to.equal(true);
    });

    it ('Se detecta si un directorio ya existe previamente', () => {
        ManejadorJSON.crearDirectorio('./pruebas');
        expect(fs.existsSync('./pruebas')).to.equal(true);
    });

    it ('Se puede crear un archivo JSON, si no existe previamente', () => {
        ManejadorJSON.crearDirectorio('./pruebas');
        ManejadorJSON.crearJSON('./pruebas/prueba.json', {nombre: 'Prueba', texto: 'Texto de prueba'});
        expect(fs.existsSync('./pruebas/prueba.json')).to.equal(true);
    });

    it ('Se puede crear un archivo JSON, se detecta si existe previamente', () => {
        ManejadorJSON.crearDirectorio('./pruebas');
        ManejadorJSON.crearJSON('./pruebas/prueba.json', {nombre: 'Prueba', texto: 'Texto de prueba'});
        expect(fs.existsSync('./pruebas/prueba.json')).to.equal(true);
    });

    it ('Se puede añadir texto a un archivo JSON, si existe previamente', () => {
        ManejadorJSON.agregarLineaJSON('./pruebas/prueba.json', {nombre: 'Prueba', texto: 'Texto de prueba'});
        expect(fs.existsSync('./pruebas/prueba.json')).to.equal(true);
    });

    it ('Se puede añadir texto a un archivo JSON, si no existe, se crea', () => {
        ManejadorJSON.eliminarJSON('./pruebas/prueba.json');
        ManejadorJSON.agregarLineaJSON('./pruebas/prueba.json', {nombre: 'Prueba', texto: 'Texto de prueba'});
        expect(fs.existsSync('./pruebas/prueba.json')).to.equal(true);
    });

    it ('Se puede eliminar un archivo JSON, si existe previamente', () => {
        ManejadorJSON.eliminarJSON('./pruebas/prueba.json');
        expect(fs.existsSync('./pruebas/prueba.json')).to.equal(false);
    });

    it ('No se puede elimar, si no existe previamente', () => {
        ManejadorJSON.eliminarJSON('./pruebas/prueba.json');
        expect(fs.existsSync('./pruebas/prueba.json')).to.equal(false);
    });
    
});
