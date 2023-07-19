import express from 'express'
import { creazioneOrdine, ordineID } from '../controller/creazioneOrdine'
import { cancellaOrdine } from '../controller/listaOrdini'
import {listaOrdini} from '../controller/listaOrdini'
import { verificatoken, verifyToken } from '../middleware/verifyToken';


export default (router: express.Router) => {
    //possono farlo tutti
    router.post('/ordini', creazioneOrdine);
    //puo farlo solo l'owner dell'ordine
    router.post('/ordini/:id', ordineID);
    router.get("/ordini/listaordini", listaOrdini);
    router.delete("/ordini/:id", cancellaOrdine);
}



