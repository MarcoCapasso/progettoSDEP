import express from 'express'
import { accesso, registrazione } from '../controller/registrazione';
import { verificatoken, verifyToken } from '../middleware/verifyToken';

export default (router: express.Router) => {
    router.post('/user/accesso', accesso);
    router.post('/user/registrazione', registrazione);
    router.get('/user/verificatoken', verifyToken, verificatoken)
}



