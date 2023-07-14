export type CartItem = {
    immagine: string | undefined
    slug: string
    quantità: number    
    prezzo: number
    _id: string
    marca: string
    modello: string
}


export type indirizzoConsegnaConcessionaria = {
    nome: string
    indirizzo: string
    città: string
    codicePostale: string
}

export type Carrello = {
    prodottiCarrello: CartItem[]
    prezzoProdotto: number
    prezzoSpedizione: number
    prezzoTasse: number
    prezzoTotale: number
    indirizzoConsegna: indirizzoConsegnaConcessionaria
    metodoPagamento: string
}