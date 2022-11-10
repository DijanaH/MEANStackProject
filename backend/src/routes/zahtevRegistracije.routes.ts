import express from 'express';
import { ZahtevRegistracijaController } from '../controllers/zahtevRegistracije.controller';



const zahtevRegistracijeRouter = express.Router();

zahtevRegistracijeRouter.route('/dodaj').post(
    (req,res) => new ZahtevRegistracijaController().dodaj(req,res)
)

zahtevRegistracijeRouter.route('/dohvati').get(
    (req,res) => new ZahtevRegistracijaController().dohvati(req,res)
)

zahtevRegistracijeRouter.route('/odbij').post(
    (req,res) => new ZahtevRegistracijaController().odbij(req,res)
)

zahtevRegistracijeRouter.route('/dohvatiPoKorLoz').post(
    (req,res) => new ZahtevRegistracijaController().dohvatiPoKorLoz(req,res)
)

export default zahtevRegistracijeRouter;