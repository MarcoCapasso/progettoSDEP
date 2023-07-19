import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { ordiniModel, getOrdini } from '../db/ordini'

export const listaOrdini =  async (req: express.Request, res: express.Response) => {
    try{
        const lista = await getOrdini()
        res.send(lista)
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}