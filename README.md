# Desarrollo de Sistemas Informáticos
### Práctica 8. Aplicación de procesamiento de notas de texto

Autor: Saúl Pérez García
Correo: alu0101129785@ull.edu.es
Fecha de entrega: 25-04-2021

### --> Introducción

En esta práctica vamos a implementar una aplicación de procesamiento de notas de texto. Esta tendrá que permitir realizar una serie de acciones como **añadir, modificar, eliminar, listar y leer** notas de un usuario concreto. Estas notas se almacenarán como ficheros JSON en el sistema de ficheros de la máquina que ejecute la aplicación. Además, solo se podrá interactuar con la aplicación desde la línea de comandos.

Para enriquecer el código, se seguirá la metodología TDD para la elaboración de pruebas, y además el código será documentado con typedoc. Como en la práctica anterior, se hará uso de **GitHub Actions** que nos va a permitir automatizar, personalizar y ejecutar nuestros flujos de trabajo de desarrollo de software directamente en el repositorio. Finalmente, en la elaboración de esta entrega se respetarán los **principios SOLID** de diseño orientado a objetos.

Antes de continuar, es conveniente revisar la documentación que se adjunta a continuación sobre los paquetes `chalk` y `yargs` que nos van a permitir dotar de color a nuestras notas y mensajes de acierto o error a o largo del código y también parsear diferentes argumentos pasados a un programa desde la línea de comandos respectivamente.
También podremos encontrar información referida a la **API síncrona de Node.js** para trabajar con el sistema de ficheros, ya que tenemos la intención de guardar el contenido de las notas en diferentes ficheros.

* [Node.js](https://www.npmjs.com/package/@types/node)
* [Chalk](https://www.npmjs.com/package/chalk)
* [Yargs](https://www.npmjs.com/package/yargs)


### --> Objetivos a conseguir

Como se mencionó anteriormente, debemos poder ser capaces de añadir, modificar, eliminar, listar y leer las notas de un usuario concreto, pero además, esta debe cumplir con una serie de requisitos, que vamos a listar:

* Esta aplicación deberá permitir que múltiples usuarios interactúen con ella, pero no simultáneamente, es decir, vamos a ser capaces de guardar las notas de diferentes usuarios.

* Cada nota estará formada, por un **título**, un **cuerpo** y un **color** (rojo, verde, azul o amarillo) aunque también se incluye el negro, y hemos establecido el blanco por defecto debido a la tonalidad oscura del entorno de trabajo.

* Cada usuario tendrá su propia lista de notas, con la que podrá llevar a cabo las siguientes operaciones:

    --> Añadir una nota a la lista. Antes de añadir una nota a la lista se debe comprobar si ya existe una nota con el mismo título. En caso de que así fuera, deberá mostrarse un mensaje de error por la consola. En caso contrario, se añadirá la nueva nota a la lista y se mostrará un mensaje informativo por la consola.

    --> Modificar una nota de la lista. Antes de modificar una nota, previamente se debe comprobar que exista una nota con el título de la nota a modificar en la lista. Si existe, se procede a su modificación y se emite un mensaje informativo por la consola. En caso contrario, debe mostrarse un mensaje de error por la consola.

    --> Eliminar una nota de la lista. Antes de eliminar una nota, previamente se debe comprobar que exista una nota con el título de la nota a eliminar en la lista. Si existe, se procede a su eliminación y se emite un mensaje informativo por la consola. En caso contrario, debe mostrarse un mensaje de error por la consola.

    --> Listar los títulos de las notas de la lista. Los títulos de las notas deben mostrarse por la consola con el color correspondiente de cada una de ellas. Esta funcionalidad se va a satisfacer por medio del paquete chalk.

    --> Leer una nota concreta de la lista. Antes de mostrar el título y el cuerpo de la nota que se quiere leer, se debe comprobar que en la lista existe una nota cuyo título sea el de la nota a leer. Si existe, se mostrará el título y cuerpo de la nota por la consola con el color correspondiente a esta haciendo uso del paquete chalk como en el caso anterior. En caso contrario, se mostrará un mensaje de error por la consola.

Existen tros aspectos o funcionalidades que también deberán de estar presentes, será imprescindible el uso de mensajes informativos que se mostrarán con color verde, mientras que los mensajes de error se mostrarán con color rojo.

Por medio de la API síncrona de Node.js, debemos hacer persistente la lista de notas de cada usuario, trabajando con el sistema de ficheros que nos va a permitir lo siguiente:

* Guardar cada nota de la lista a un fichero con formato JSON. Los ficheros JSON correspondientes a las notas de un usuario concreto deberán almacenarse en un directorio con el nombre de dicho usuario.

* Cargar una nota desde los diferentes ficheros con formato JSON almacenados en el directorio del usuario correspondiente.

### Implementación

A partir de ahora, vamos a pasar a explicar la solución propuesta para esta práctica. Esta gira entorno a las notas, por tanto, vamos a comenzar viendo el fichero `note.ts`.

`note.ts` contiene la clase `Note` con los siguietes atributos:

```
  * @param title Title of a note
  * @param color Color of a note
  * @param text Text or body of a note 
```

También va a presentar los siguientes métodos:

```
  getTitle() // returns the title of a note
  getColor() // returns the color of a note
  getText() // returns the text or body of a note
```

Además, cuenta con un enumerado denominado `Color` que contiene los distintos colores disponibles para las notas. Como podemos ver, esta clase tiene como misión dotar a una nota de sus características fundamentales.






















// npx ts-node src/index.ts add --user="edusegre" --title="Black note" --body="This is now a black note" --color="black"
// npx ts-node src/index.ts read --user="edusegre" --title="Yellow note"
// npx ts-node src/index.ts list --user="edusegre"
// npx ts-node src/index.ts modify --user="edusegre" --title="Yellow  note" --body="This is now a yellow note" --color="yellow"
// npx ts-node src/index.ts remove --user="edusegre" --title="Red note"

