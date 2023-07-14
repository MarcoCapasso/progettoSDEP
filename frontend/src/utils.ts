import { ApiError } from "./types/ApiError"
import { Veicolo } from "./types/Veicolo"
import { CartItem } from "./types/carrello"


export const getError = (error: ApiError) => {
    return error.response && error.response.data.message
    ? error.response.data.message
    : error.message
}

export const convertVeicoloToCartItem = (veicolo: Veicolo): CartItem => {
    const cartItem: CartItem = {
        _id: veicolo._id,
        marca: veicolo.marca,
        modello: veicolo.modello,
        slug: veicolo.slug,
        immagine: veicolo.immagine,
        prezzo: veicolo.prezzo,
        quantità: 1,
    }

    return cartItem
}