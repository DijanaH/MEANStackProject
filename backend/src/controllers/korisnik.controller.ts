import express, { json } from 'express';
import korisnik from '../models/korisnik';
import Korisnik from '../models/korisnik';


export class KorisnikController {

    prijava = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;


        Korisnik.findOne({ 'kor_ime': kor_ime, 'lozinka': lozinka },
            (err, korisnik) => {
                if (err) console.log(err);
                else res.json(korisnik);
            })
    }

    dohvatiSve = (req: express.Request, res: express.Response) => {

        Korisnik.find({},
            (err, korisnici) => {
                if (err) console.log(err);
                else res.json(korisnici);
            })
    }

    jedinstvenMejl = (req: express.Request, res: express.Response) => {
        let mejl = req.body.mejl;

        Korisnik.find({ 'mejl': mejl },
            (err, korisnici) => {
                if (err) console.log(err);
                else {
                    console.log(korisnici);
                    if (korisnici.length == 0) res.json({ 'message': 'jeste' })
                    else res.json({ 'message': 'nije' })
                }
            })
    }

    registracija = (req: express.Request, res: express.Response) => {

        console.log("REGISTRACIJAAA")

        console.log(req.body.oglasivactip)
        console.log(req.body.tip)

        Korisnik.find({}, (err, korisnici) => {
            if (err) console.log(err);

            else {
                let id = korisnici.length + 1;
                let kor = new Korisnik(req.body);
                kor.id = id;
                console.log(kor.id);
                kor.save().then((korisnik) => {
                    res.status(200).json({ 'message': 'korisnik registrovan' })
                }).catch((err) => {
                    res.status(400).json({ 'message': 'korisnik nije registrovan' })
                })
            }
        })


    }

    dohvati_neodobrene_neodbijene = (req: express.Request, res: express.Response) => {

        korisnik.find({ "odobren": false, "odbijen": false },
            (err, neodobreni) => {
                if (err) console.log(err);
                else res.json(neodobreni);
            })
    }

    dohvatiPoId = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        console.log("AAAAAAAAAAAAAAAAAAA");
        console.log(req.body.id);
        console.log("AAAAAAAAAAAAAAAAAAA");
        Korisnik.findOne({ 'id': id },
            (err, korisnik) => {
                if (err) console.log(err);
                else res.json(korisnik);

            })
    }

    odobri = (req: express.Request, res: express.Response) => {
        let id = req.body.id;

        Korisnik.findOne({ "id": id },
            (err, kor) => {
                Korisnik.updateOne({ 'id': id }, { $set: { 'odobren': true } },
                    (err, raw) => {
                        if (err) console.log(err)
                        else res.json({ 'message': 'odobren' })
                    })
            })
    }

    odbij = (req: express.Request, res: express.Response) => {
        let id = req.body.id;

        Korisnik.findOne({ "id": id },
            (err, kor) => {
                Korisnik.updateOne({ 'id': id }, { $set: { 'odbijen': true } },
                    (err, raw) => {
                        if (err) console.log(err)
                        else res.json({ 'message': 'odbijen' })
                    })
            })
    }

    promenaLozinke = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let nova = req.body.nova;
        Korisnik.findOne({ 'id': id },
            (err, korisnik) => {
                if (err) console.log(err)
                else {
                    Korisnik.updateOne({ 'id': id }, { $set: { 'lozinka': nova } },
                        (err, raw) => {
                            if (err) console.log(err);
                            else res.json({ "message": "Uspesno promenja lozinka" })
                        })
                }
            })

    }

    izmeniLicnePodatke = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let telefon = req.body.telefon;
        let mejl = req.body.mejl;
        let agencija = req.body.agencija;
        let br_licence = req.body.br_licence;

        if(telefon){
            Korisnik.collection.updateOne({'id':id},{$set:{'telefon':telefon}});
        }
        if(mejl){
            Korisnik.collection.updateOne({'id':id},{$set:{'mejl':mejl}});
        }
        if(agencija){
            Korisnik.collection.updateOne({'id':id},{$set:{'agencija':agencija}});
        }
        if(br_licence){
            Korisnik.collection.updateOne({'id':id},{$set:{'br_licence':br_licence}});
            Korisnik.collection.updateOne({'id':id},{$set:{'oglasivactip':'agent'}});
        }



        return res.json({'message':'izmenjeno'})
        

    }


}