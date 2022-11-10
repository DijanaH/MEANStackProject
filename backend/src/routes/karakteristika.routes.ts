import express from 'express';
import { KarakteristikaController } from '../controllers/karakteristika.controller';


const karakteristikaRouter = express.Router();

karakteristikaRouter.route('/dodaj').post(
    (req,res) => new KarakteristikaController().dodaj(req,res)
)

karakteristikaRouter.route('/dohvatipoIdOglas').post(
    (req,res) => new KarakteristikaController().dohvatipoIdOglas(req,res)
)

karakteristikaRouter.route('/pretrazi_napredno').post(
    (req,res) => new KarakteristikaController().pretrazi_napredno(req,res)
)

karakteristikaRouter.route('/dohvati_sve').get(
    (req,res) => new KarakteristikaController().dohvati_sve(req,res)
)



export default karakteristikaRouter;
