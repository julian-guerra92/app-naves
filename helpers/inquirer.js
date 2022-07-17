const inquirer = require('inquirer');
const { validate } = require('uuid');
require('colors');

//Creación del Menú de la aplicación
const question = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear Nave.`
            },
            {
                value: '2',
                name: `${'2.'.green} Consultar Todas las Naves.`
            },
            {
                value: '3',
                name: `${'3.'.green} Consultar Naves Activas.`
            },
            {
                value: '4',
                name: `${'4.'.green} Consultar Naves Inactivas.`
            },
            {
                value: '5',
                name: `${'5.'.green} Cambiar Estado de Naves.`
            },
            {
                value: '6',
                name: `${'6.'.green} Autodestruir Naves.`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir del Sistema.`
            }
        ]
    }
];


const inquirerMenu = async () => {

    console.clear();
    console.log('============================================='.green);
    console.log('   SISTEMA GENERAL DE INVENTARIO DE NAVES    '.bgCyan);
    console.log('               Menú de Opciones              '.bgCyan);
    console.log('=============================================\n'.green);

    const { opcion } = await inquirer.prompt(question);
    return opcion;
}

const pausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar...`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}

//Función para ingreso de información por parte del usuario
const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor...';
                }
                return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt(question);
    return desc;
}


//Función para borrar naves
const listadoNavesEliminar = async (naves = []) => {

    const choices = naves.map((nave, i) =>{
        const idx = `${i + 1}.`.green;
        return{
            value: nave.id,
            name: `${idx} ${nave.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(question);
    return id;
}

const confirmar = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question);
    return ok;
}

//Función para marcar naves (Activar o Inactivar)
const mostrarListadoCheckList = async (naves = []) => {

    const choices = naves.map((nave, i) =>{
        const idx = `${i + 1}.`.green;
        return{
            value: nave.id,
            name: ` ${idx} ${nave.desc}`,
            checked: (nave.fechaActivacion)? true: false
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(question);
    return ids;
}

//Exporación de las funciones
module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoNavesEliminar,
    confirmar,
    mostrarListadoCheckList
}