import express from 'express';
import { OglassController } from '../controllers/oglas.controller';

const oglasRouter = express.Router();

oglasRouter.route('/pretrazi').post(
    (req,res) => new OglassController().pretrazi(req,res)
)

oglasRouter.route('/dohvatiPoId').post(
    (req,res) => new OglassController().dohvatiPoId(req,res)
)

oglasRouter.route('/dohvatiSve').get(
    (req,res) => new OglassController().dohvatiSve(req,res)
)

oglasRouter.route('/dohvatiPoOglasio').post(
    (req,res) => new OglassController().dohvatiPoOglasio(req,res)
)

oglasRouter.route('/prodato').post(
    (req,res) => new OglassController().prodato(req,res)
)

oglasRouter.route('/unos').post(
    (req,res) => new OglassController().unos(req,res)
)

oglasRouter.route('/postavi_prosecnu_cenu').post(
    (req,res) => new OglassController().postavi_prosecnu_cenu(req,res)
)

oglasRouter.route('/dohvati_pet_poslednjih').get(
    (req,res) => new OglassController().dohvati_pet_poslednjih(req,res)
)

oglasRouter.route('/pretrazi_napredno').post(
    (req,res) => new OglassController().pretrazi_napredno(req,res)
)

export default oglasRouter;

