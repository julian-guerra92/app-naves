
require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarAchivo');
const { inquirerMenu,
        pausa,
        leerInput,
        listadoNavesEliminar,
        confirmar,
        mostrarListadoCheckList
} = require('./helpers/inquirer');
const Naves = require('./models/naves');


//Ejecución de la aplicación

const main = async () => {

    let opt = '';
    const naves = new Naves();

    //lectura de la base de datos para cargar las naves
    const navesDB = leerDB();

    if (navesDB) {
        naves.cargaNavesFormArray(navesDB);
    }

    do {
        //Imprimir el menú
        opt = await inquirerMenu();

        switch (opt) {
            case '1': // Crear una nueva nave
                const desc = await leerInput('Descripción:');
                naves.crearNave(desc);
                break;

            case '2': // Consultar todas las naves, estado y fecha de creación 
                naves.listadoCompleto();
                break;

            case '3': //Listar naves activas
                naves.listarNavesActivasInactivas(true);
                break;

            case '4': //Listar naves inactivas
                naves.listarNavesActivasInactivas(false);
                break;

            case '5': //Activar naves
                const ids = await mostrarListadoCheckList(naves.listadoArr);
                naves.toggleActivadas(ids);
                break;
            
            case '6': //Eliminar naves
                const id = await listadoNavesEliminar(naves.listadoArr);
                if(id !== '0'){
                    const validarConfirmar = await confirmar('¿Está seguro de que desea autodestruir esta nave?')
                    if(validarConfirmar){
                        naves.borrarNave(id);
                        console.log('\n----!!Nave autodestruida!!----'.red);
                    }
                }
                break;

        }

        guardarDB(naves.listadoArr);

        await pausa();

    } while (opt != '0');

}

main();