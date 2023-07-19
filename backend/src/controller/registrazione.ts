import express from 'express';
import { createUser, getUsersByEmail } from '../db/users';


//funzione di accesso, sono necessari due campi: email e password, se uno dei due manca viene restituito errore.
export const accesso = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(400);
        }
//ricerca l'utente attraverso l'email, se non è presente nel database, restituisce errore, altrimenti effettua l'accesso
        const user = await getUsersByEmail(email);

        if (!user) {
            return res.sendStatus(400);
        }
        
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error)
        return res.sendStatus(400);
    }
}

export const registrazione = async (req: express.Request, res: express.Response) => {
    try {
        const {nome, cognome, email, password} = req.body;

        if(!nome || !cognome || !email || !password) {
            return res.sendStatus(400);
        }

        const existingUser = await getUsersByEmail(email);
        if(existingUser){
            return res.sendStatus(400);
        }

        const user = await createUser({
            nome,
            cognome,
            email,
            password,
        });

        return res.status(200).json(user).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export default (router: express.Router) => {
    router.post('/user/accesso', accesso);
    router.post('/user/registrazione', registrazione);
};