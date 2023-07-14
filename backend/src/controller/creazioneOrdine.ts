import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { ordineSchema, ordiniModel } from '../db/ordini'

export const orderRouter = express.Router()

orderRouter.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).json({ message: 'Il carrelo è vuoto.' })
    } else {
      const createdOrder = await ordiniModel.create({
        orderItems: req.body.orderItems, /*.map((x: ordineSchema) => ({ 
          ...x,
          product: x._id,
        })),*/
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
)