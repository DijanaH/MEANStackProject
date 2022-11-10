import express from 'express';
import { DetaljiController } from '../controllers/detaljinekretnine.controller';

const detaljiNekretnineRouter = express.Router();

detaljiNekretnineRouter.route('/dodaj').post(
    (req,res) => new DetaljiController().dodaj(req,res)
)

detaljiNekretnineRouter.route('/dohvatipoIdOglas').post(
    (req,res) => new DetaljiController().dohvatipoIdOglas(req,res)
)

detaljiNekretnineRouter.route('/pretrazi_napredno').post(
    (req,res) => new DetaljiController().pretrazi_napredno(req,res)
)



export default detaljiNekretnineRouter;

