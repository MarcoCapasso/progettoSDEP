import express from 'express'
import { accesso, registrazione } from '../controller/registrazione';

export default (router: express.Router) => {
    router.post('/user/accesso', accesso);
    router.post('/user/registrazione', registrazione);
}



