import { CartItem, indirizzoConsegnaConcessionaria } from './carrello'
import { User } from './User'

export type Order ={
  _id: string,
  prodotti: CartItem[],
  indirizzoConsegna: indirizzoConsegnaConcessionaria,
  prezzoTotale: number,
  prezzoProdotto: number,
  prezzoTasse: number,
  prezzoSpedizione: number,
  user: String
}