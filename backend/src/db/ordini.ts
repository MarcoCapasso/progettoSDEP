import { userSchema } from "./users";
import { VeicoloModel } from "./veicolo";
import mongoose, { Document } from "mongoose";

const indirizzoConsegna = new mongoose.Schema ({
    nome: { type: String, required: true },
    citta: { type: String, required: true },
    indirizzo: { type: String, required: true },
    codicePostale: { type: String, required: true },
})


export const prodotto = new mongoose.Schema({
  _id: { type: String, required: true },
  marca: { type: String, required: true },
  modello: { type: String, required: true },
  slug: {type: String, required: true},
  immagine: { type: String, required: true },
  prezzo: { type: Number, required: true },
  quantità: {type: Number, required: true}
})

const pagamento = new mongoose.Schema({
    idPagamento: {type:String},
    status: {type:String},
    emailUtilizzata: {type:String}
})

export const ordineSchema = new mongoose.Schema({
    prodotti: [prodotto],
    metodoPagamento: {type:String, require: true},
    indirizzoConsegna: indirizzoConsegna,
    prezzoTotale: {type:Number, require: true},
    prezzoTasse: {type:Number, require: true},
    prezzoProdotto: {type:Number, require: true},
    prezzoSpedizione: {type:Number, require: true},
    user: {type:String, require: true},
    }, {
        timestamps: true,
})

export const ordiniModel = mongoose.model('Ordini', ordineSchema);

export interface Prodotto extends Document {
    /*marca: string;
    modello: string;
    immagine: string;
    prezzo: number;*/
    quantità: number
}


export const createOrdini = (values: Record<string, any>) => new ordiniModel(values).save().then((ordini) => ordini.toObject());
export const getOrdini = () => ordiniModel.find({})
