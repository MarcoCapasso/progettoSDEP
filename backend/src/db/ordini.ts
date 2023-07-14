import { UserModel } from "./users";
import { VeicoloModel } from "./veicolo";
import mongoose from "mongoose";

const indirizzoConsegna = new mongoose.Schema ({
    nomeConcessionaria: { type: String, required: true },
    città: { type: String, required: true },
    indirizzo: { type: String, required: true },
    codicePostale: { type: String, required: true },
})


const prodotto = new mongoose.Schema({
  marca: { type: String, required: true },
  modello: { type: String, required: true },
  immagine: { type: String, required: true },
  prezzo: { type: Number, required: true },
})

const pagamento = new mongoose.Schema({
    idPagamento: {type:String},
    status: {type:String},
    emailUtilizzata: {type:String}
})

export const ordineSchema = new mongoose.Schema({
    id: {type:String},
    veicolOrdine: prodotto,
    indirizzoConsegna: indirizzoConsegna,
    utente: UserModel,
    pagato: {type:Boolean}
    }, {
        timestamps: true,
})

export const ordiniModel = mongoose.model('Ordini', ordineSchema);

