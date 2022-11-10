import express, { json } from 'express';
import ZahtevRegistracije from '../models/zahteviRegistracije';

export class ZahtevRegistracijaController {

    dodaj =  (req: express.Request, res: express.Response) => {
        
        console.log(req.body);

        ZahtevRegistracije.find({},
            (err,registracije)=>{
                if(err) console.log(err);
                else {

                    let id = registracije.length+1;
                    let zahtev = new ZahtevRegistracije(req.body);
                    zahtev.id = id;
                    zahtev.save().then((ag)=>{
                        res.status(200).json({'message':'zahtev dodat'})
                    }).catch((err)=>{
                        res.status(400).json({'message':'zahtev nije dodat'})
                    })
                    
                }
            })
        
    }

    dohvati=(req: express.Request, res: express.Response) => {

        ZahtevRegistracije.find({},
            (err,zahtevireg)=>{
                if(err) console.log(err)
                else res.json(zahtevireg);
            })
        
    }

    odbij = (req: express.Request, res: express.Response) => {

        let id = req.body.id;

        console.log("BRISANJEEEE")

        ZahtevRegistracije.deleteOne({'id':id}).then((r)=>{
            res.status(200).json({'message':'obrisan'})
        }).catch((err)=>[
            res.status(400).json({'message':'greska'})
        ])
        
        
        
    }

    dohvatiPoKorLoz = (req: express.Request, res: express.Response) => {

        let kor_ime=req.body.kor_ime;
        let lozinka = req.body.lozinka;

        ZahtevRegistracije.findOne({'kor_ime':kor_ime,'lozinka':lozinka},
        (err,kor)=>{
            if(err) console.log(err);
            else res.json(kor);
        })
        
    }
    
}