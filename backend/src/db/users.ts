import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
}, {
  timestamps: true,
})

export const UserModel = mongoose.model('User', userSchema);

export const getUsers = () => UserModel.find()
export const getUsersByEmail = (email: string) => UserModel.findOne({ email });
export const getUSerByPassword = (password: string) => UserModel.findOne({ password});


export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserByEmail = (email: string) => UserModel.findOneAndDelete({ email: email});