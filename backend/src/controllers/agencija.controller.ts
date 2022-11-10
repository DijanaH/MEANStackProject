import express, { json } from 'express';
import Agencija from '../models/agencija';

export class AgencijaController {


    dohvatiSve = (req: express.Request, res: express.Response) => {
        Agencija.find({},
            (err,agencije)=>{
                if(err) console.log(err)
                else res.json(agencije)
            })
       
    }

    dohvatiPoNazivu = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        Agencija.findOne({'naziv':naziv}, 
        (err,agencija)=>{
            if(err) console.log(err)
            else res.json(agencija)
        })
    }

    dodaj =  (req: express.Request, res: express.Response) => {
        
        console.log(req.body);

        let agencija = new Agencija(req.body);
        agencija.save().then((ag)=>{
            res.status(200).json({'message':'agencija dodata'})
        }).catch((err)=>{
            res.status(400).json({'message':'agencija nije dodata'})
        })
        
    }
}