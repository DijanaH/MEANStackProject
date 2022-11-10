import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Karakteristika = new Schema(
    {   
        idOglas:{
            type:Number
        },
        terasa : {
            type:Boolean
        },
        podrum : {
            type:Boolean
        },
        internet : {
            type:Boolean
        },
        lodja : {
            type:Boolean
        },
        garaza : {
            type:Boolean
        },
        interfon : {
            type:Boolean
        },
        francbalkon : {
            type:Boolean
        },
        basta : {
            type:Boolean
        },
        telefon : {
            type:Boolean
        },
        lift : {
            type:Boolean
        },
        klima : {
            type:Boolean
        }
    }

)


export default mongoose.model('Karakteristika', Karakteristika, 'karakteristike');