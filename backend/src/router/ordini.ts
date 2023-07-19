import express from 'express'
import { creazioneOrdine, ordineID } from '../controller/creazioneOrdine'
import {listaOrdini} from '../controller/listaOrdini'


export default (router: express.Router) => {
    router.post('/ordini', creazioneOrdine);
    router.post('/ordini/:id', ordineID);
    router.get("/ordini/listaordini", listaOrdini);
}



