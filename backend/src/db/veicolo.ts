import mongoose from "mongoose";

export const veicoloSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  modello: { type: String, required: true },
  slug: { type: String, required: true },
  immagine: { type: String, required: true },
  condizioni: { type: String, required: true },
  prezzo: { type: Number, required: true },
  km: { type: Number, required: false },
  disponibilita: { type: Number, required: true },
  descrizione: { type: String, required: true },
}, {
  timestamps: true,
})


export const VeicoloModel = mongoose.model('Veicolo', veicoloSchema);

export const getVeicolo = () => VeicoloModel.find()
export const getVeicoloBySlug = (slug: string) => VeicoloModel.findOne({ slug });
export const getVeicoloByCondizioni = (condizioni: string) => VeicoloModel.findOne({ condizioni});

export const createVeicolo = (values: Record<string, any>) => new VeicoloModel(values).save().then((veicolo) => veicolo.toObject());
export const deleteVeicoloBySlug = (slug: string) => VeicoloModel.findOneAndDelete({ slug: slug});