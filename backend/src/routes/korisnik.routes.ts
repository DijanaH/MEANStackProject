import express from 'express';
import { KorisnikController } from '../controllers/korisnik.controller';

const korisnikRouter = express.Router();

korisnikRouter.route('/prijava').post(
    (req, res) => new KorisnikController().prijava(req, res)
)

korisnikRouter.route('/dohvatiSve').get(
    (req, res) => new KorisnikController().dohvatiSve(req, res)
)

korisnikRouter.route('/jedinstvenMejl').post(
    (req, res) => new KorisnikController().jedinstvenMejl(req, res)
)

korisnikRouter.route('/registracija').post(
    (req, res) => new KorisnikController().registracija(req, res)
)

korisnikRouter.route('/dohvati_neodobrene_neodbijene').get(
    (req, res) => new KorisnikController().dohvati_neodobrene_neodbijene(req, res)
)

korisnikRouter.route('/dohvatiPoId').post(
    (req, res) => new KorisnikController().dohvatiPoId(req, res)
)

korisnikRouter.route('/odobri').post(
    (req, res) => new KorisnikController().odobri(req, res)
)

korisnikRouter.route('/odbij').post(
    (req, res) => new KorisnikController().odbij(req, res)
)

korisnikRouter.route('/promenaLozinke').post(
    (req, res) => new KorisnikController().promenaLozinke(req, res)
)

korisnikRouter.route('/izmeniLicnePodatke').post(
    (req, res) => new KorisnikController().izmeniLicnePodatke(req, res)
)


export default korisnikRouter;

