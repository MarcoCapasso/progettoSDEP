import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
const Ordini = require("../db/ordini")
import { Prodotto, ordiniModel, createOrdini } from '../db/ordini'


//funzione per la creazione dell'ordine, prende i campi all'interno del corpo della richiesta per inserirli 
//nella tabella ordine presente nel database
export const creazioneOrdine =  async (req: express.Request, res: express.Response) => {
  try{
    const ordine = await createOrdini({
      
      prodotti: req.body.prodotti,
      indirizzoConsegna: req.body.indirizzoConsegna,
      metodoPagamento: req.body.metodoPagamento,
      prezzoTotale: req.body.prezzoTotale,
      prezzoTasse: req.body.prezzoTasse,
      prezzoProdotto: req.body.prezzoProdotto,
      prezzoSpedizione: req.body.prezzoSpedizione,
      user: req.body.email
    });
    res.status(201).json({ message: 'Ordine completato correttamente', order: ordine })
    //}
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
  }

 export const ordineID =  asyncHandler(async (req: Request, res: Response) => {
     const order = await ordiniModel.findById(req.params.id)
     if (order) {
       res.json(order)
     } else {
       res.status(404).json({ message: 'Ordine non trovato' })
     }
   })


  export default (router: express.Router) => {
    router.post('/ordini', creazioneOrdine);
    router.post('/ordini/:id', ordineID);
};
