import express from 'express'
import { creazioneOrdine, ordineID } from '../controller/creazioneOrdine'


export default (router: express.Router) => {
    router.post('/ordine', creazioneOrdine);
    router.post('/ordine/:id', ordineID);
}