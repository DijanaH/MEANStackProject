import express from 'express';
import { OmiljenaController } from '../controllers/omiljena.controller';



const omiljenaRouter = express.Router();

omiljenaRouter.route('/dodaj').post(
    (req,res) => new OmiljenaController().dodaj(req,res)
)

omiljenaRouter.route('/dohvati').post(
    (req,res) => new OmiljenaController().dohvati(req,res)
)
omiljenaRouter.route('/ukloni').post(
    (req,res) => new OmiljenaController().ukloni(req,res)
)

export default omiljenaRouter;