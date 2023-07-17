import express from 'express'
import { getAllVeicolo, getVeicoloBySlug1, inserimentoVeicoli } from '../controller/inserimentoVeicoli';
//import { getVeicoloBySlug } from '../db/veicolo';

export default (router: express.Router) => {
    router.post('/veicolo/registrazione', inserimentoVeicoli);
    router.get('/veicolo', getAllVeicolo);
    router.post('/veicolo/:slug',getVeicoloBySlug1);
}