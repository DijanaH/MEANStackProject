import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Oglas = new Schema({
    id: {
        type: Number
    },
    oglasio: {
        type: Number
    },
    naziv: {
        type: String
    },
    tip_nekretnine: {
        type: String
    },
    lokacija: {
        type: String
    },
    cena: {
        type: Number
    },
    kvadratura: {
        type: Number
    },
    broj_soba: {
        type: Number
    },
    spratnost: {
        type: Number
    },
    opis: {
        type: String
    },
    prosecna_cena: {
        type: Number
    },
    prodato: {
        type: Boolean
    },
    fotografije: {
        type: Array
    }

})

export default mongoose.model('Oglas', Oglas, 'oglasi');