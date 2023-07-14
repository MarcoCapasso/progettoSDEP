import express from 'express';
import registrazione from './registrazione';
import users from './users';
import inserimentoVeicoli from './inserimentoVeicoli';
//import { orderRouter } from './routers/orderRouter'


const router = express.Router();

export default () : express.Router => {
    registrazione(router);
    users(router);
    inserimentoVeicoli(router);
    
    return router;
};