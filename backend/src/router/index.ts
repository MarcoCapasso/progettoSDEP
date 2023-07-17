import express from 'express';
import registrazione from './registrazione';
import users from './users';
import inserimentoVeicoli from './inserimentoVeicoli';
import ordini from './ordini';

const router = express.Router();

export default () : express.Router => {
    registrazione(router);
    users(router);
    inserimentoVeicoli(router);
    ordini(router);

    return router;
};