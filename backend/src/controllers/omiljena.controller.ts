import express, { json } from 'express';
import Omiljena from '../models/omiljena';


export class OmiljenaController {

    dodaj = (req: express.Request, res: express.Response) => {

        let idKupca = req.body.idKupca;
        let oglas = req.body.idOgl;

        Omiljena.findOne({ 'idKupca': idKupca },
            (err, omiljena) => {
                if (err) console.log(err);
                else {
                    if (omiljena) {

                        let idOglas = {
                            oglas: oglas
                        }

                        console.log(idOglas);
                        console.log(omiljena);


                        Omiljena.collection.updateOne({ 'idKupca': idKupca }, { $push: { 'idOglasa': idOglas } }, (err, res) => {
                            if (err) console.log(err);
                        })

                        return res.json({'message':'dodata'})

                    }
                    else {
                        let idOglas = {
                            oglas: oglas
                        }
                        let nova = new Omiljena({ 'idKupca': idKupca, 'idOglasa': idOglas });

                        console.log("nova", nova);
                        console.log('DODAJEM PRVU')

                        nova.save().then((r) => {
                            res.status(200).json({ 'message': 'dodata' })
                        }).catch((err) => {
                            res.status(400).json({ 'message': 'nije dodata' })
                        })
                    }
                }
            })

    }

    dohvati = (req: express.Request, res: express.Response) => {

        let idKupca = req.body.idKupca;

        Omiljena.findOne({'idKupca':idKupca},
        (err,omilj)=>{
            if(err) console.log(err)
            else res.json(omilj)
        })

    }

    ukloni = (req: express.Request, res: express.Response) => {

        let idKupca = req.body.idKupca;
        let oglas = req.body.idOgl;

        let idOglas = {
            oglas: oglas
        }

        console.log(idOglas);
        console.log(idKupca)

        Omiljena.collection.updateOne({'idKupca':idKupca},{$pull:{'idOglasa':idOglas}});
        return res.json({'message':'uklonjena'});
    }




}