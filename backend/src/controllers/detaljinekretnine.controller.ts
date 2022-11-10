import express, { json } from 'express';
import DetaljiNekretnine from '../models/detaljinekretnine';
import Oglas from '../models/oglas';

export class DetaljiController {

    dodaj = (req: express.Request, res: express.Response) => {

        Oglas.find({},
            (err, oglasi) => {
                if (err) console.log(err);
                else {
                    let idOglas = oglasi.length;
                    let oglasivac = req.body.oglasivac;
                    let godinaizgradnje = req.body.godinaizgradnje;
                    let stanje = req.body.stanje;
                    let tipgrejanja = req.body.tipgrejanja;
                    let trsprat = req.body.trsprat;
                    let parking = req.body.parking;
                    let mesrezije = req.body.mesrezije;

                    console.log(req.body);

                    let detaljinek = new DetaljiNekretnine({ 'idOglas': idOglas, 'oglasivac': oglasivac, 'godinaizgradnje': godinaizgradnje, 'stanje': stanje, 'tipgrejanja': tipgrejanja, 'trsprat': trsprat, 'parking': parking, 'mesrezije': mesrezije });
                    detaljinek.save().then((r) => {
                        res.status(200).json({ 'message': "dodatDetalj" });
                    }).catch((err) => {
                        res.status(400).json({ "message": "nije dodatDetalj" })
                    })
                }
            })
    }


    dohvatipoIdOglas = (req: express.Request, res: express.Response) => {


        let idOglas = req.body.idOglas;
        console.log(idOglas);

        DetaljiNekretnine.findOne({ 'idOglas': idOglas },
            (err, detaljnek) => {
                if (err) console.log(err);
                else res.json(detaljnek);
            })
    }



    pretrazi_napredno = (req: express.Request, res: express.Response) => {

        let godizgradnjeod = req.body.godizgradnjeod;
        let godizgradnjedo = req.body.godizgradnjedo;
        let stanje = req.body.stanje;
        let tipgrejanja = req.body.tipgrejanja;
        let spratod = req.body.spratod;
        let spratdo = req.body.spratdo;
        let mesrezijeod = req.body.mesrezijeod;
        let mesrezijedo = req.body.mesrezijedo;
        let oglasivac = req.body.oglasivac;

        let oglasivac1;
        let oglasivac2;

        if(oglasivac){
            if(oglasivac[0]) oglasivac1 = req.body.oglasivac[0];
            if(oglasivac[1]) oglasivac2 = req.body.oglasivac[1];
        }
        
        

        let stanje1;
        let stanje2;
        let stanje3;

        if(stanje){
            if(stanje[0]) stanje1 = req.body.stanje[0];
            if(stanje[1]) stanje2 = req.body.stanje[1];
            if(stanje[2]) stanje3 = req.body.stanje[2];
    
        }
        
        


        var conditions = Object();
        var and_clauses = [];

        //VAUUU MOGLO JE I BEZ OVOGA......STRASNO - za tip grejanja ostavljeno normalno

        if (stanje1 && stanje2 && stanje3) and_clauses.push({ $or: [{ 'stanje': stanje1 }, { 'stanje': stanje2 }, { 'stanje': stanje3 }] });
        else if (stanje1 && stanje2) and_clauses.push({ $or: [{ 'stanje': stanje1 }, { 'stanje': stanje2 }] });
        else if (stanje1 && stanje3) and_clauses.push({ $or: [{ 'stanje': stanje1 }, { 'stanje': stanje3 }] });
        else if (stanje2 && stanje3) and_clauses.push({ $or: [{ 'stanje': stanje2 }, { 'stanje': stanje3 }] });
        else if (stanje1) and_clauses.push({ 'stanje': stanje1 });
        else if (stanje2) and_clauses.push({ 'stanje': stanje2 });
        else if (stanje3) and_clauses.push({ 'stanje': stanje3 });



        console.log('blllllaaaaaa', oglasivac1)
        console.log('blllllaaaaaa', oglasivac2)


        if (godizgradnjeod) and_clauses.push({ 'godinaizgradnje': { $gte: godizgradnjeod } });
        if (godizgradnjedo) and_clauses.push({ 'godinaizgradnje': { $lte: godizgradnjedo } });
        //
        if (oglasivac1 && oglasivac2) and_clauses.push({ $or: [{ 'oglasivac': oglasivac1 }, { 'oglasivac': oglasivac2 }] });
        else if (oglasivac1) and_clauses.push({ 'oglasivac': oglasivac1 });
        else if (oglasivac2) and_clauses.push({ 'oglasivac': oglasivac2 });
        //
        //if (stanje) and_clauses.push({ 'stanje': stanje });
        if (tipgrejanja) and_clauses.push({ 'tipgrejanja': tipgrejanja });
        if (spratod) and_clauses.push({ 'trsprat': { $gte: spratod } });
        if (spratdo) and_clauses.push({ 'trsprat': { $lte: spratdo } });
        if (mesrezijeod) and_clauses.push({ 'mesrezije': { $gte: mesrezijeod } });
        if (mesrezijedo) and_clauses.push({ 'mesrezije': { $lte: mesrezijedo } });




        //  console.log({ and_clauses });
        conditions['$and'] = and_clauses;
        //  console.log({ conditions });

        DetaljiNekretnine.find(
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

