import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
const Ordini = require("../db/ordini")
import { Prodotto, ordiniModel } from '../db/ordini'

export const creazioneOrdine = asyncHandler(async (req: Request, res: Response) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).json({ message: 'Il carrello è vuoto.' })
    } else {
      const createdOrder = await Ordini.create({
        orderItems: req.body.orderItems.map((x: Prodotto) => ({ 
          ...x,
          product: x.modello,
        })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.body.email
      })
      res.status(201).json({ message: 'Ordine completato correttamente', order: createdOrder })
    }
  })



export const ordineID =  asyncHandler(async (req: Request, res: Response) => {
    const order = await ordiniModel.findById(req.params.id)
    if (order) {
      res.json(order)
    } else {
      res.status(404).json({ message: 'Ordine non trovato' })
    }
  })


  export default (router: express.Router) => {
    router.post('/ordine', creazioneOrdine);
    router.post('/ordine/:id', ordineID);
};
