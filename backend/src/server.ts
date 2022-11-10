import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { mongo } from 'mongoose';
import korisnikRouter from './routes/korisnik.routes';
import oglasRouter from './routes/oglas.routes';
import agencijaRouter from './routes/agencija.routes';
import zahtevRegistracijeRouter from './routes/zahtevRegistracije.routes';
import karakteristikaRouter from './routes/karakteristika.routes';
import detaljiNekretnineRouter from './routes/detaljinekretnine.routes';
import omiljenaRouter from './routes/omiljena.routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/projekatprovera');

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log("<<<<<<<<<<<<<OK>>>>>>>>>>>")
})

const router = express.Router();

router.use('/korisnici',korisnikRouter,()=>{
    console.log("blaa")
});

router.use('/oglasi', oglasRouter);
router.use('/agencije',agencijaRouter);
router.use('/zahtevi_registracije',zahtevRegistracijeRouter);
router.use('/karakteristike',karakteristikaRouter);
router.use('/detalji',detaljiNekretnineRouter);
router.use('/omiljene',omiljenaRouter);

app.use('/', router,()=>{
    console.log('kkkkkk')
});
app.listen(4000, () => console.log(`Express server running on port 4000`));

