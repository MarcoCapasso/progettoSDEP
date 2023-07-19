import express from "express";

import { createUser, getUsersByEmail } from "../db/users";

import dotenv from "dotenv";
const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";

dotenv.config();

//funzione di accesso, sono necessari due campi: email e password, se uno dei due manca viene restituito errore.
export const accesso = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }
    //ricerca l'utente attraverso l'email, se non è presente nel database, restituisce errore
    const user = await getUsersByEmail(email);

    if (!user) {
      return res.sendStatus(400);
    }
    //confronta la password inserita con quella presente nel database, se non corrispondono restituisce errore
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.sendStatus(400);
    }
    //se l'utente è presente e la password è corretta, restituisce i dati dell'utente e il token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.CHIAVE_JWT,
      { expiresIn: 3600 }
    );

    res
      .cookie("token", token, { httpOnly: true , secure:false})
      .status(200)
      .json({
        id: user._id,
        isAdmin: user.isAdmin,
        nome: user.nome,
        cognome: user.cognome,
        email: user.email,
      });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const registrazione = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // prendo dati da body
    const { nome, cognome, email, password } = req.body;

    // controllo che i dati siano presenti
    if (!nome || !cognome || !email || !password) {
      return res.sendStatus(400);
    }

    // controllo che l'utente non esista già
    const existingUser = await getUsersByEmail(email);
    if (existingUser) {
      return res.sendStatus(400);
    }

    // cripto la password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // creo l'utente con i dati passati
    const user = await createUser({
      nome,
      cognome,
      email,
      password: hashedPassword,
    });

    // creo il token
    const token = jwt.sign(
        { id: user._id, isAdmin: false },
        process.env.CHIAVE_JWT,
        { expiresIn: 3600 }
    );

    res.cookie("token", token, { httpOnly: true })
      .status(200)
      .json({
        id: user._id,
        isAdmin: false,
        nome: user.nome,
        cognome: user.cognome,
        email: user.email,
      });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export default (router: express.Router) => {
  router.post("/user/accesso", accesso);
  router.post("/user/registrazione", registrazione);
};
