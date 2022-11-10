import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Omiljena = new Schema(
    {
        idKupca: {
            type: Number
        },
        idOglasa: {
            type: Array
        }
    }

)


export default mongoose.model('Omiljena', Omiljena, 'omiljene');