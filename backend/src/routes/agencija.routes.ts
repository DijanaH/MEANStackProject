import express from 'express';
import { AgencijaController } from '../controllers/agencija.controller';


const agencijaRouter = express.Router();

agencijaRouter.route('/dohvatiSve').get(
    (req,res) => new AgencijaController().dohvatiSve(req,res)
)

agencijaRouter.route('/dohvatiPoNazivu').post(
    (req,res) => new AgencijaController().dohvatiPoNazivu(req,res)
)

agencijaRouter.route('/dodaj').post(
    (req,res) => new AgencijaController().dodaj(req,res)
)

export default agencijaRouter;