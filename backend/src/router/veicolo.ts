import express from "express";
import { getAllVeicolo } from "../controller/inserimentoVeicoli";
import { getVeicoloBySlug } from "db/veicolo";

export default (router: express.Router) => {
    router.get('/veicolo', getAllVeicolo);
    router.post('/veicolo/slug', getVeicoloBySlug);
    //router.delete('/user/:email', deleteUser);
};