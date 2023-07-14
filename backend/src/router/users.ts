import express from "express";
import { getAllUsers } from "../controller/users";

export default (router: express.Router) => {
    router.get('/user', getAllUsers);
    //router.delete('/user/:email', deleteUser);
};