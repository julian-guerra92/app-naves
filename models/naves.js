const Nave = require('./nave');

class Naves {

    _listado = {};

    constructor() {
        this._listado = {};
    };

    get listadoArr() {
        const listado = []
        Object.keys(this._listado).forEach(key => {
            const nave = this._listado[key];
            listado.push(nave);
        });
        return listado;
    };

    borrarNave(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargaNavesFormArray(naves = []) {
        naves.forEach(nave => {
            this._listado[nave.id] = nave;
        })
    };

    crearNave(desc = '') {
        const nave = new Nave(desc);
        nave.fechaCreacion = new Date().toDateString();
        this._listado[nave.id] = nave;
    };

    listadoCompleto() {
        console.log('');
        this.listadoArr.forEach((nave, i) => {
            const idx = `${i + 1}.`.green;
            const { desc, fechaCreacion, fechaActivacion } = nave;
            const estado = (fechaActivacion) ? 'Activa'.green : 'Inactiva'.red;
            console.log(`${idx} ${desc} - Fecha Creación: ${fechaCreacion.blue} - Estado: ${estado}`);
        })
    };

    listarNavesActivasInactivas(activas = true) {
        console.log('');
        let contador = 0;
        this.listadoArr.forEach((nave) => {
            const { desc, fechaActivacion } = nave;
            const estado = (fechaActivacion) ? 'Activa'.green : 'Inactiva'.red;
            if(activas){
                //Mostrar naves activas
                if(fechaActivacion){
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} - Fecha de activación: ${fechaActivacion.green}`);
                }
            } else{
                //Mostrar naves inactivas
                if(!fechaActivacion){
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} - Estado: ${estado}`);
                }
            }

        })
    };

    toggleActivadas(ids = []){
        ids.forEach(id => {
            const nave = this._listado[id];
            if(!nave.fechaActivacion){
                nave.fechaActivacion = new Date().toDateString();
            }
        });

        this.listadoArr.forEach(nave => {
            if(!ids.includes(nave.id)){
                this._listado[nave.id].fechaActivacion = null;
            }
        });
    }

}

module.exports = Naves;