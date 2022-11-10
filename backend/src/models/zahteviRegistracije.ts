import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let ZahtevRegistracije = new Schema(
    {
        id: {
            type: Number
        },
        ime: {
            type: String
        },
        prezime: {
            type: String
        },
        kor_ime: {
            type: String
        },
        lozinka: {
            type: String
        },
        tip: {
            type: String
        },
        grad: {
            type: String
        },
        datum_rodjenja: {
            type: Date
        },
        slika: {
            type: String
        },
        telefon: {
            type: String
        },
        mejl: {
            type: String
        },
        oglasivactip: {
            type: String
        },
        agencija: {
            type: String
        },
        br_licence: {
            type: Number
        }
    }
)


export default mongoose.model('ZahtevRegistracije', ZahtevRegistracije, 'zahteviRegistracije');