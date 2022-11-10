import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let DetaljiNekretnine = new Schema(
    {
        idOglas: {
            type: String
        },
        oglasivac: {
            type: String
        },
        godinaizgradnje: {
            type: Number
        },
        stanje: {
            type: String
        },
        tipgrejanja: {
            type: String
        },
        trsprat: {
            type: Number
        },
        parking: {
            type: Boolean
        },
        mesrezije: {
            type: Number
        }
    }

)


export default mongoose.model('DetaljiNekretnine', DetaljiNekretnine, 'detaljinekretnina');