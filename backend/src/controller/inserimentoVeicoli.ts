import express from "express";
import { createVeicolo, getVeicolo, getVeicoloBySlug } from '../db/veicolo';

export const inserimentoVeicoli = async (req: express.Request, res: express.Response) => {
    try {
        const {marca, modello, slug, immagine, condizioni, prezzo, km, disponibilita, descrizione} = req.body;

        if(!marca || !modello || !slug || !immagine || !condizioni || !prezzo || !km || !disponibilita || !descrizione) {
            return res.sendStatus(400);
        }

        const existingVeicolo = await getVeicoloBySlug(slug);
        if(existingVeicolo){
            return res.sendStatus(400);
        }

        const veicolo = await createVeicolo({
            marca, 
            modello, 
            slug, 
            immagine, 
            condizioni, 
            prezzo, 
            km, 
            disponibilita,
            descrizione,
        });

        return res.status(200).json(veicolo).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const getVeicoloBySlug1 = async (req: express.Request, res: express.Response) => {
    const slug = req.body.slug
    try {
        const veicolo = await getVeicoloBySlug(slug);
        return res.send(veicolo);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const getAllVeicolo = async (req: express.Request, res: express.Response) => {
    try {
        const veicolo = await getVeicolo();
        return res.status(200).json(veicolo);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};


export default (router: express.Router) => {
    router.get('/veicolo', getAllVeicolo);
    router.post('/veicolo/slug', getVeicoloBySlug1);
    router.post('/veicolo/registrazione', inserimentoVeicoli);
};