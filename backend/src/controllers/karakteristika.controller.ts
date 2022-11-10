import express, { json } from 'express';
import Oglas from '../models/oglas';
import Karakteristika from '../models/karakteristika';



export class KarakteristikaController {


    dodaj = (req: express.Request, res: express.Response) => {

        Oglas.find({},
            (err, oglasi) => {
                if (err) console.log(err);
                else {
                    let idOglas = oglasi.length;
                    let terasa = req.body.terasa;
                    let podrum = req.body.podrum;
                    let internet = req.body.internet;
                    let lodja = req.body.lodja;
                    let garaza = req.body.garaza;
                    let interfon = req.body.interfon;
                    let francbalkon = req.body.francbalkon;
                    let basta = req.body.basta;
                    let telefon = req.body.telefon;
                    let lift = req.body.lift;
                    let klima = req.body.klima;
                    console.log(req.body);
                    let karakteristika = new Karakteristika({ 'idOglas': idOglas, 'terasa': terasa, 'podrum': podrum, 'internet': internet, 'lodja': lodja, 'garaza': garaza, 'interfon': interfon, 'francbalkon': francbalkon, 'basta': basta, 'telefon': telefon, 'lift': lift, 'klima': klima });
                    karakteristika.save().then((r) => {
                        res.status(200).json({ 'message': "dodata" });
                    }).catch((err) => {
                        res.status(400).json({ "message": "nije dodata" })
                    })
                }
            })
    }

    dohvatipoIdOglas = (req: express.Request, res: express.Response) => {


        let idOglas = req.body.idOglas;
        console.log(idOglas);

        Karakteristika.findOne({ 'idOglas': idOglas },
            (err, karakteristika) => {
                if (err) console.log(err);
                else res.json(karakteristika);
            })
    }

    pretrazi_napredno = (req: express.Request, res: express.Response) => {

        let terasa = req.body.terasa;
        let podrum = req.body.podrum;
        let internet = req.body.internet;
        let lodja = req.body.lodja;
        let garaza = req.body.garaza;
        let interfon = req.body.interfon;
        let francbalkon = req.body.francbalkon;
        let basta = req.body.basta;
        let telefon = req.body.telefon;
        let lift = req.body.lift;
        let klima = req.body.klima;

        var conditions = Object();
        var and_clauses = [];

        if (terasa) and_clauses.push({ 'terasa': true });
        if (podrum) and_clauses.push({ 'podrum': true });
        if (internet) and_clauses.push({ 'internet': true });
        if (lodja) and_clauses.push({ 'lodja': true });
        if (garaza) and_clauses.push({ 'garaza': true });
        if (interfon) and_clauses.push({ 'interfon': true });
        if (francbalkon) and_clauses.push({ 'francbalkon': true });
        if (basta) and_clauses.push({ 'basta': true });
        if (telefon) and_clauses.push({ 'telefon': true });
        if (lift) and_clauses.push({ 'lift': true });
        if (klima) and_clauses.push({ 'klima': true });
    

        //  console.log({ and_clauses });
        conditions['$and'] = and_clauses;
        //  console.log({ conditions });

        Karakteristika.find(
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

    dohvati_sve = (req: express.Request, res: express.Response) => {
        console.log("DoHVATI")

        Karakteristika.find({},
            (err, karakteristike) => {
                if (err) console.log(err);
                else res.json(karakteristike);
            })
    }

}