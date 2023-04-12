# Práctica 9 - Aplicación de registro de Funko Pops
## Desarrollado por Daniel Felipe Gómez Aristizabal 

## Indice 

1. [Introducción](#introduccion)

2. [Hablemos de Yarg](#hablemos-de-yarg)

3. [Hablemos de Chalk](#hablemos-de-chalk)

4. [Hablemos de File System](#hablemos-de-file-system)

5. [Clase Funko](#clase-funko)

6. [Clase ManejadorJSON](#clase-manejadorjson)

7. [Clase MenuFunko](#clase-menufunko)

8. [Enumerables](#enumerables)

9. [Interfaces](#interfaces)

10. [Ejemplo de uso](#ejemplo-de-uso)


## Introducción

En la práctica se pretende desarrollar una aplicación para coleccionar Funkos, el usuario solo podrá usar la línea de comandos para manejar la aplicación, para poder gestionar os argumentos usados, usaremos la librería Yarg. Por otro lado, usaremos la librería Chalk que nos permitirá personalizar nuestros mensajes de salida. Finalmente, usaremos la librería File System para poder leer y escribir archivos JSON, además de crear directorios.

## Hablemos de Yarg

Yarg es bastante sencilla a mi parecer a comparación de lo que suponía en otros lenguajes de programación trabajar con argumentos. Realmente me ha parecido útil el poder crear una serie de menús según el comando principal que se pretenda usar y el menú de ayuda es bastante intuitivo y de verdad 'ayuda' a ubicar el error.


## Hablemos de Chalk

Recuerdo que para las primeras prácticas intente hacer uso de esta librería para imprimir de una forma más agradable algunas funciones, pero no me funcionó, por lo que me rendí en su entonces. Sin embargo esta vez ha sido muy sencilla de usar y me ha resultado muy útil, ya que no me es cómodo los colores con los que se suele imprimir en la consola, debido a que no se distinguen bien los mensajes de error y los mensajes normales.

## Hablemos de File System

Esta librería es sin duda una herramienta clave, me ha parecido súper sencilla de usar y muy útil, el hecho de realizar comprobaciones de si existe o no un fichero y poder gestionarlas, es realmente sencillo. En mi caso le dí bastante uso ya que de cierta forma la uso en dos clase. Incluso al principio desarrolle un menú muy diferente al que finalmente implementé, ya que en un principio pese que los Funkos no se podían crear, sino que ya existían en un fichero y se podían 'comprar'. Es por esto que en un principio desarrolle un fichero con varios Funkos, para simular una tienda.

## Clase Funko

Esta clase permite modelar el comportamiento que tendrá un Funko, definí todos los atributos del Funko protected, esto con el fin de dejarlo abierto a herencia por si se requiere en un futuro. 

Para definir el Funko, uso un constructor simplificado que proporciona el lenguaje. Dentro me aseguro de que no se pasen valores inválidos de creación, por ejemplo, que el nombre no sea un string vacío, que el valor introducido no sea negativo y que el identificador de Funko sea un número entero.

Definí los respectivos *getters* para las propiedades, las cuales listaré a continuación:

- **id**: Identificador del Funko

- **nombre**: Nombre del Funko

- **descripcion**: Descripción del Funko

- **tipo**: Tipo de Funko

- **genero**: Género del Funko

- **franquicia**: Franquicia del Funko

- **numero**: Número del Funko

- **exclusivo**: Indica si el Funko es exclusivo

- **caracteristica_especial**: Característica especial del Funko

- **valor_mercado**: Valor de mercado del Funko

Finalmente definí el método *toString* que me permite imprimir el Funko más legible y además añadí los rangos de precio que se pedían en la práctica.

## Clase ManejadorJSON

Esta clase agrupa las distintas funcionalidades que desarrollé para manejar ficheros JSON y crear directorios. La idea es que no se creen objetos de esta clase, simplemente se usen sus funciones estáticas.

Desarrolle una función *crearDirectorio*, la cual como su nombre lo indica, crea un directorio. Recibe como parámetro el nombre del directorio a crear. y comprueba si existe, en caso de que no exista, lo crea. Esta operación se encierra dentro de un bloque *try-catch*, para asegurarnos de notificar cualquier error que se presente.

Incluí un método *agregarLineaJSON*, que recibe como parámetros el nombre del fichero y el contenido del fichero. Como tipo de contenido definí *object*, para generalizar el comportamiento de los métodos. Lo mismo ocurre en el método *crearJSON* que cumple la misma función que el anterior, pero en este caso si existe ya un fichero, lo sobrescribe.

Se ha incluido un método *eliminarJSON*, este verifica si el fichero existe, en caso de que exista, lo elimina. En caso de que no exista, notifica al usuario. Nuevamente estos métodos se encierra dentro de un bloque *try-catch*, para asegurarnos de notificar cualquier error que se presente.

Finalmente, se ha incluido un método *leerJSON*, el cual recibe como parámetro el nombre del fichero a leer. Este método lee el fichero y devuelve el contenido del mismo. En caso de que no exista el fichero, devuelve un array vacío.

## Clase MenuFunko

Similar a lo planeado en la clase anterior de ManejadorJSON, esta clase agrupa las distintas funcionalidades que desarrollé para manejar los Funkos. Nuevamente no se pretenden crear objetos de esta clase, simplemente se usará su función de menú, que se encargará de manejar los argumentos introducidos por el usuario, para llamar a los métodos encargados de realizar las acciones.

Tenemos entonces métodos como *agregarFunko*, *modificarFunko*, *eliminarFunko*, *listarFunko*, *mostrarFunko*. Estos básicamente toman los argumentos dados y construyen en nombre correspondiente para llamar a los métodos ya definidos de *ManejadorJSON*.

Importante mencionar que la creación de los ficheros para almacenar a un Funko, decidí hacerlo a partir del id del Funko, de esta forma se impide que se creen dos Funkos con el mismo id.

También destacar que el código se vio muy simplificado gracias a que el nombre de usuario se pasa en todas las llamadas a las funciones, por lo que con construir la cadena que define su ruta de almacenamiento, se puede acceder a los ficheros de cada usuario.

Para finalizar, el *controladorMenuFunko* almacena todo el menú de posibilidades que se le ofrece al usuario, y según la opción que elija, se llama a la función correspondiente.


## Enumerables

Para la práctica se nos pedían definir dos enumerables que modelaran; el tipo de Funko y el género del Funko.

### TipoFunko

Debo confesar que desconozco el mundo de los Funkos, asi que me limité a usar los tipos que se proponían de ejemplo en el guion de la práctica. Es así como definí 4 tipos de Funkos, los cuales son:

- **Pop!**: Funko de la serie Pop!

- **Pop! Rides**: Funko de la serie Pop! Rides

- **Vynil Gold**: Funko de la serie Vynil Gold

- **Vynl Soda**: Funko de la serie Vynil Soda

### GeneroFunko

En este caso me inventé 4 *géneros de Funkos*, un poco graciosos pero que supongo no quedan tan desubicados. Los géneros son:

- **Comidas y Sabores**: Funkos de comidas y sabores, según yo son muñecos en forma de comida.

- **Deportistas**: Funkos de deportes, por ejemplo, de jugadores de futbol.

- **Profesiones**: Funkos de profesiones, por ejemplo, de médicos.

- **Galacticos**: Funkos que son de otra liga, galácticos.

## Interfaces

Definí dos interfaces, una define la forma que debe tener un objeto Funko y otra la use para definir la forma de recuperar y añadir un Funko a un fichero JSON. De esta forma se puede construir fácilmente un objeto Funko a partir de un fichero JSON y viceversa.

## Ejemplo de uso 

A continuación dejo un ejemplo de uso para cada opción que ofrece el programa.

### Añadir un Funko

```bash
$ node dist/index.js add --user "Dani" --id 2 --nombre "Poco" --descripcion "Un poquito loco" --tipo "Pop!" --genero "Comidas y Sabores" --franquicia "BrawlStars" --numero 4 --exclusivo --caracteristica_especial "Toca musica" --valor_mercado 100
```

### Modificar un Funko existente

```bash
$ node dist/index.js update --user "Dani" --id 2 --nombre "Poco" --descripcion "Un poquito loco" --tipo "Pop!" --genero "Comidas y Sabores" --franquicia "BrawlStars" --numero 4 --exclusivo --caracteristica_especial "Toca musica" --valor_mercado 100
```

### Eliminar un Funko existente

```bash
$ node dist/index.js delete --user "Dani" --id 2
```

### Listar los Funkos del usuario

```bash
$ node dist/index.js list --user "Dani"
```

#### Mostrar un Funko específico del usuario

```bash
$ node dist/index.js read --user "Dani" --id 1
```

## Conclusiones

Esta practica he de reconocer que ha resultado sencilla, pero muy entretenida, me ha gustado bastante pues me ha permitido trabajar de gran forma con varias librerías, que aunque sencillas, resultan bastante útiles. El hecho de conseguir persistencia en los programas es algo realmente útil, ya que le da más sentido a la aplicación pues lo sientes algo más real.

Además, creo que me ha permitido entender una nueva forma de crear test, pues he probado a crear ficheros para los test y la vez eliminarlos, esto me evita crear conflictos con el funcionamiento del programa y a la vez poder testearlo todo correctamente.