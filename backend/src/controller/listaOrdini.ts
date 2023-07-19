import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { ordiniModel, getOrdini, deleteOrdine } from '../db/ordini'

export const listaOrdini =  async (req: express.Request, res: express.Response) => {
    try{
        const lista = await getOrdini()
        res.send(lista)
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const cancellaOrdine = asyncHandler(async (req: Request, res: Response) => {
    try{
        const id = req.params.id
        const result = await deleteOrdine(id)
        res.send("Ordine cancellato correttamente" + result)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});