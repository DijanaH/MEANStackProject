import express, { json } from 'express';
import Oglas from '../models/oglas';

export class OglassController {


    pretrazi = (req: express.Request, res: express.Response) => {

        // console.log("OGLAAAAAAAAAAAAAAAAAAAAAAAAAAAAS")
        console.log(req.body.lokacija);

        let tip_nekretnine = req.body.tip_nekretnine;
        let lokacija = req.body.lokacija;
        let cena_do = req.body.cena_do;
        let kvadratura_od = req.body.kvadratura_od;
        let min_br_soba = req.body.min_br_soba;

        var conditions = Object();
        var and_clauses = [];

        and_clauses.push({ 'tip_nekretnine': tip_nekretnine });
        and_clauses.push({'prodato':false});
        if (lokacija) and_clauses.push({ 'lokacija': lokacija });
        if (cena_do) and_clauses.push({ 'cena': { $lte: cena_do } });
        if (kvadratura_od) and_clauses.push({ 'kvadratura': { $gte: kvadratura_od } });
        if (min_br_soba) and_clauses.push({ 'broj_soba': { $gt: min_br_soba } });

        //  console.log({ and_clauses });
        conditions['$and'] = and_clauses;
        //  console.log({ conditions });

        Oglas.find(
            conditions
            ,
            (err, oglasi) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(oglasi);
                    res.json(oglasi);
                }
            }


        )

        /*   Oglas.find({ 'tip_nekretnine': tip_nekretnine, 'lokacija': lokacija, 'cena': { $lt: cena_do }, 'kvadratura': { $gt: kvadratura_od }, 'broj_soba': { $gt: min_br_soba } },
               (err, oglasi) => {
                   if (err) {
                       console.log(err)
                   }
                   else {
                       res.json(oglasi)
                   }
               }) */
    }

    dohvatiPoId = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        Oglas.findOne({ 'id': id },
            (err, oglas) => {
                if (err) console.log(err)
                else res.json(oglas)
            })
    }

    dohvatiPoOglasio = (req: express.Request, res: express.Response) => {
        let oglasio = req.body.oglasio;
        Oglas.find({ 'oglasio': oglasio },
            (err, oglasi) => {
                if (err) console.log(err)
                else res.json(oglasi)
            })
    }

    dohvatiSve = (req: express.Request, res: express.Response) => {

        Oglas.find({},
            (err, oglasi) => {
                if (err) console.log(err)
                else res.json(oglasi)
            })
    }

    prodato = (req: express.Request, res: express.Response) => {
        let id = req.body.id;

        Oglas.findOne({ 'id': id },
            (err, oglas) => {
                if (err) console.log(err)
                else {
                    Oglas.updateOne({ 'id': id }, { $set: { "prodato": true } },
                        (err, raw) => {
                            if (err) console.log(err)
                            else res.json({ 'message': 'prodato' })
                        })
                }
            })
    }

    unos = (req: express.Request, res: express.Response) => {

        console.log("UNOOS OGLASAAAAAAA")

        Oglas.find({},
            (err,oglasi)=>{
                if(err) console.log(err)
                else{
                    let id = oglasi.length + 1;
                    let oglas = new Oglas(req.body);
                    oglas.id = id;
                    oglas.save().then((val)=>{
                        res.status(200).json({'message':"Nekretnina uneta"})
                    }).catch((err)=>{
                        res.status(200).json({'message':"Greska pri unosu"})
                    })
                }
            })

    }

    postavi_prosecnu_cenu = (req: express.Request, res: express.Response) => {

        console.log(req.body.lokacija);
        console.log(req.body.prosecna_cena);
        let lokacija = req.body.lokacija;
        let prosecna_cena = req.body.prosecna_cena;
        
        Oglas.collection.updateMany({'lokacija':lokacija},{$set:{'prosecna_cena':prosecna_cena}}).then((r)=>{
            res.status(200).json({'message':'postavljena prosecna cena'})
        }).catch((err)=>{
            res.status(400).json({'message':'nije postavljena prosecna cena'})
        })

    }

    dohvati_pet_poslednjih=(req: express.Request, res: express.Response) => {

       Oglas.find({},
        (err,oglasi)=>{
            if(err) console.log(err)
            else{
                let id = oglasi.length;
                id=id-5;
                Oglas.find({'id':{$gt:id}},
                    (err,oglasi)=>{
                        if(err) console.log(err)
                        else res.json(oglasi);
                    })

            }
        })

    }



    pretrazi_napredno = (req: express.Request, res: express.Response) => {

         console.log("OGLAAAAAAAAAAAAAAAAAAAAAAAAAAAAS")
        

        let cenaod=req.body.cenaod;
        let cenado = req.body.cenado;
        let kvadraturaod=req.body.kvadraturaod;
        let kvadraturado = req.body.kvadraturado;
        let brojsobaod = req.body.brojsobaod;
        let brojsobado = req.body.brojsobado;

        var conditions = Object();
        var and_clauses = [];

        if(cenaod) and_clauses.push({'cena':{$gte:cenaod}});
        if(cenado) and_clauses.push({'cena':{$lte:cenado}});
        if(kvadraturaod) and_clauses.push({'kvadratura':{$gte:kvadraturaod}})
        if(kvadraturado) and_clauses.push({'kvadratura':{$lte:kvadraturado}})
        if(brojsobaod) and_clauses.push({'broj_soba':{$gte:brojsobaod}})
        if(brojsobado) and_clauses.push({'broj_soba':{$lte:brojsobado}})
      

        //  console.log({ and_clauses });
        conditions['$and'] = and_clauses;
        //  console.log({ conditions });

        Oglas.find(
            conditions
            ,
            (err, oglasi) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(oglasi);
                    res.json(oglasi);
                }
            }


        )

    }

}