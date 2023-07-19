export type CartItem = {
    immagine: string 
    slug: string
    _id: string
    marca: string
    modello: string
    prezzo: number
    quantità: number 
}


export type indirizzoConsegnaConcessionaria = {
    nome: string
    indirizzo: string
    citta: string
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