const { v4: uuidv4 } = require('uuid');

class Nave {
    id = '';
    desc = '';
    fechaCreacion = null;
    fechaActivacion = null;

    constructor(desc){
        this.id = uuidv4();
        this.desc = desc;
        this.fechaCreacion = null;
        this.fechaActivacion = null;
    }
}

module.exports = Nave;