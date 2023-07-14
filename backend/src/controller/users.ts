import express from 'express'
import { getUsers } from '../db/users';
//import { deleteUserByEmail, getUsers } from '../db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

/*export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { email } = req.params;

        const deletedUser = await deleteUserByEmail(email);

        return res.json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}*/


/*export const updateUser = async (req: express.Request, res: express.Response) => {
    try{
        const { email } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.sendStatus(400);
        }
        const user = await getUserByEmail(email);

        user.password = password;
        await user.save();

        return res.sendStatus(200).json(user).end();
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
} */